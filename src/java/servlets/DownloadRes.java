package servlets;

import db.ProjectDB;
import entity.DataServlet;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import projects.ProjectM;

@WebServlet(name = "DownloadRes", urlPatterns = {"/download/*"})
public class DownloadRes extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
/*
            ProjectDB projectDb = new ProjectDB(request);
            List<ProjectM> listProject;
            ProjectM pc;
            String projectId;
*/
            String[] ar = (" " + ds.query).split("/");
            String basePath = ds.patchOutsideProject;
            String userProjPath;
            String filename;
            File file;
            switch (ar[2]) {
                case "get_apk":
                        userProjPath = Constants.USERS_DATA + ar[3] + "/" + ar[4];
                        filename = basePath + userProjPath + "/app/build/outputs/apk/debug/" + ar[5];
                        file = new File(filename);
                        if (file.exists()) {
                            response.setHeader("Accept-Ranges", "bytes");
                            response.setContentType("application/octet-stream");
                            response.setContentLength((int)file.length());
                            response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");
                            try {
                                Files.copy(file.toPath(), response.getOutputStream());
                            } catch (IOException e) {
                                System.out.println("Get export error " + e.toString());
                                response.reset();
                                sendError(response, "Get export error " + e.toString());
                                break;
                            }
                        } else {
                            sendError(response, "Export error");
                        }
                        deleteDir(basePath + userProjPath);
                    break;
                case "get_project":
                        userProjPath = Constants.USERS_DATA + ar[3] + "/" + ar[4];
                        filename = basePath + userProjPath;
                        file = new File(filename);
                        if (file.exists()) {
                            response.setHeader("Accept-Ranges", "bytes");
                            response.setContentType("application/zip");
                            response.setContentLength((int)file.length());
                            response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");
                            try {
                                Files.copy(file.toPath(), response.getOutputStream());
                            } catch (IOException e) {
                                System.out.println(e);
                                sendError(response, "Get export error " + e.toString());
                                break;
                            }
                        } else {
                            sendError(response, "Export error");
                        }
                        String[] ff = filename.split("\\.");
                        deleteDir(ff[0]);
                        deleteFile(filename);
                    break;
            }
    }
    
    @Override
    public int needToLogin() {
        return 0;
    }
}
