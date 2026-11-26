package ch.duartesantos.opengym;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Saves a picture the app drew (the share card after a workout, a progress comparison) into the
 * gallery, under Pictures/My Gym. MediaStore needs no permission for the app's own new files on
 * Android 10 and later; older phones answer "unsupported" and the page offers the share sheet.
 *
 *   const SaveImage = registerPlugin('SaveImage')
 *   await SaveImage.save({ path: 'file:///…/cache/opengym-workout.png' })   // { saved: true }
 */
@CapacitorPlugin(name = "SaveImage")
public class SaveImagePlugin extends Plugin {

    @PluginMethod
    public void save(PluginCall call) {
        String path = call.getString("path");
        if (path == null || !path.startsWith("file://")) { call.reject("path must be a file URL"); return; }
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) { call.reject("Needs Android 10", "unsupported"); return; }
        String rawPath = Uri.parse(path).getPath();
        if (rawPath == null || rawPath.isEmpty()) { call.reject("Invalid file URL"); return; }
        File cacheDir;
        File file;
        try {
            cacheDir = getContext().getCacheDir().getCanonicalFile();
            file = new File(rawPath).getCanonicalFile();
        } catch (IOException e) {
            call.reject("Invalid file path", e);
            return;
        }
        String cachePrefix = cacheDir.getPath().endsWith(File.separator) ? cacheDir.getPath() : cacheDir.getPath() + File.separator;
        if (!file.getPath().startsWith(cachePrefix) || !file.isFile()) { call.reject("No such file"); return; }
        String name = file.getName();
        String mime = name.endsWith(".jpg") || name.endsWith(".jpeg") ? "image/jpeg" : "image/png";
        ContentResolver resolver = getContext().getContentResolver();
        ContentValues values = new ContentValues();
        values.put(MediaStore.Images.Media.DISPLAY_NAME, name);
        values.put(MediaStore.Images.Media.MIME_TYPE, mime);
        values.put(MediaStore.Images.Media.RELATIVE_PATH, Environment.DIRECTORY_PICTURES + "/My Gym");
        values.put(MediaStore.Images.Media.IS_PENDING, 1);
        Uri item = resolver.insert(MediaStore.Images.Media.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY), values);
        if (item == null) { call.reject("Could not save"); return; }
        try (InputStream in = new FileInputStream(file); OutputStream out = resolver.openOutputStream(item)) {
            if (out == null) throw new java.io.IOException("no output stream");
            byte[] buf = new byte[64 * 1024];
            for (int n; (n = in.read(buf)) > 0; ) out.write(buf, 0, n);
        } catch (Exception e) {
            resolver.delete(item, null, null);
            call.reject("Could not save", e);
            return;
        }
        values.clear();
        values.put(MediaStore.Images.Media.IS_PENDING, 0);
        resolver.update(item, values, null, null);
        JSObject ret = new JSObject();
        ret.put("saved", true);
        call.resolve(ret);
    }
}
