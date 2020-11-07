package servlets;

import db.ProjectDB;
import entity.DataServlet;
import entity.Profile;
//import entity.UserM;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Paths;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import projects.ProjectM;

@WebServlet(name = "UploadFile", urlPatterns = {"/upload/*"})
@MultipartConfig
public class UploadFile extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
        switch (ds.query) {
            case "/upload/image":
                String projectId = request.getHeader("projectId");
                if (projectId == null) {
                    String[] parAr = request.getParameterValues("projectId");
                    if (parAr != null) {
                        projectId = parAr[0];
                    } else {
                        try {
                            sendHTML("notParam.html", response.getWriter(), "<div>Not param projectId</div>");
                            break;
//                        sendError(response, "Not param projectId");
                        } catch (IOException ex) {
                            System.out.println("UploadFile error: "+ex);
                        }
                    }
                }
                ProjectDB projectDb = new ProjectDB(request);
                ProjectM proj = projectDb.getProjectById(projectId);
                String resurseInd = proj.resurseInd;
                String userDataPath = Constants.PROJECTS_DATA + resurseInd;
                String appPath = ds.patchOutsideProject;
                String projectPath = appPath + userDataPath;
//                String appPath = request.getServletContext().getRealPath("");
//                String projectPath = appPath + File.separator + userDataPath;
                
                try {
                    String savePathRes = projectPath + "/";
                    List<Part> fileParts;
                    fileParts = request.getParts().stream().filter(part -> "imgFile".equals(part.getName())).collect(Collectors.toList());
                    for (Part filePart : fileParts) {
                        String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
                        InputStream inputStream = filePart.getInputStream();
                        if (fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase().equals("zip")) {
                            unZip(inputStream, savePathRes);
                        } else {
                            byte[] buffer = new byte[1000];
                            FileOutputStream outputStream = new FileOutputStream(projectPath + File.separator + fileName);
                            while (inputStream.available() > 0) {
                                int count = inputStream.read(buffer);
                                outputStream.write(buffer, 0, count);
                            }
                            inputStream.close();
                            outputStream.close();
                        }
                    }
                    sendHTML("uploadImg.html", response.getWriter());
                } catch (IOException ex) {
                    System.out.println("UploadFile error: "+ex);
                } catch (ServletException ex) {
                    System.out.println("UploadFile error: "+ex);
                }
                break;
                
        }
    }

    private void unZip(InputStream is, String dir) {
        try(ZipInputStream zin = new ZipInputStream(is)) {
            ZipEntry entry;
            String name;
            while((entry=zin.getNextEntry())!=null){
                name = entry.getName();
                if (entry.isDirectory()) {
                    createDir(dir + name);
                } else {
                    FileOutputStream fout = new FileOutputStream(dir + name);
                    for (int c = zin.read(); c != -1; c = zin.read()) {
                        fout.write(c);
                    }
                    fout.flush();
                    zin.closeEntry();
                    fout.close();
                }
            }
        } catch(Exception ex){
            System.out.println("UploadFile unzip image error=" + ex.getMessage());
        } 
    }
    
    @Override
    public int needToLogin() {
        return 2;
    }

}
