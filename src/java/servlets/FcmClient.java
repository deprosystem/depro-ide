package servlets;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FcmClient {
    
    public FcmClient(String serviceAccountFile) {
        Path p = Paths.get(serviceAccountFile);
        try (InputStream serviceAccount = Files.newInputStream(p)) {
/*
            FirebaseOptions options = new FirebaseOptions.Builder()
                  .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                  .build();

            FirebaseApp.initializeApp(options);
*/
        } catch (IOException e) {
            System.out.println("FcmClient error=" + e);
        }
    }
}
