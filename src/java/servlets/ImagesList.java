package servlets;

import db.ProjectDB;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import entity.DataServlet;
import projects.ProjectM;

@WebServlet(name = "ImagesList", urlPatterns = {"/images/*"})
public class ImagesList extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
        switch (ds.query) {
            case "/images/list":
                String projectId = request.getHeader("projectId");
                ProjectDB projectDb = new ProjectDB(request);
                ProjectM proj = projectDb.getProjectById(projectId);
                String resurseInd = proj.resurseInd;
                String userDataPath = Constants.PROJECTS_DATA + resurseInd + "/res/drawable-hdpi/";
                String appPath = ds.patchOutsideProject;
//                String appPath = request.getServletContext().getRealPath("");
                String projectPath = appPath + userDataPath;
                sendResult(response, getListImages(projectPath, userDataPath));
        }
    }
    
    private String getListImages(String dataPath, String userDataPath) {
System.out.println("dataPath="+dataPath+"<< userDataPath="+userDataPath+"<<");
        String res = "[]";
        List<String> results = new ArrayList();
        File[] files = new File(dataPath).listFiles();
        if (files == null) {
            System.out.println("ImagesList error: No icons");
        } else {
            for (File file : files) {
                if (file.isFile()) {
                    results.add(userDataPath + file.getName());
                }
            }
            res = gson.toJson(results);
        }
        return res;
    }
    
    @Override
    public int needToLogin() {
        return 2;
    }
}
