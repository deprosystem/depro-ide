package servlets;

import com.google.gson.JsonSyntaxException;
import db.ProjectDB;
import db.SQL;
import db.UserDB;
import entity.DataServlet;
import entity.ListScreen;
import java.io.File;
//import entity.ScreenM;
import projects.ProjectM;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import projects.ItemAppParam;
import projects.ItemResurces;
import projects.ItemStyle;

@WebServlet(name = "Project", urlPatterns = {"/project/*"})
public class Project extends BaseServlet {

        @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
            ProjectDB projectDb = new ProjectDB(request);
            List<ProjectM> listProject;
            ProjectM pc;
            switch (ds.query) {
                case "/project/create":
                    pc = null;
                    try {
                        pc = gson.fromJson(getStringRequest(request), ProjectM.class);
                        pc.userId = ds.userId;
                        pc.namePackage = pc.nameProject + ".ide";
                        if (pc.logo == null) {
                            pc.logo = "";
                        }
                        if (pc.comment == null) {
                            pc.comment = "";
                        }
                        if (pc.nameAPP == null || pc.nameAPP.length() == 0) {
                            pc.nameAPP = pc.nameProject;
                        }
                    } catch (JsonSyntaxException | IOException e) {
                        System.out.println(e);
                        sendError(response, "Project create error " + e.toString());
                    }
                    long id = -1;
                    if (pc != null) {
                        pc.strings = formStrings(pc.nameAPP);
                        pc.colors = formColor();
                        pc.dimens = formDimens();
                        pc.style = formStyle();
                        pc.drawable = formDrawable();
                        pc.appParam = formAppParam();
                        pc.screens = formScreens();
                        pc.resurseInd = createRandomStr(20);
                        pc.dateCreate = new Date().getTime();
                        id = projectDb.createProjectId(pc);
                        pc.projectId = id;
//                        createBaseRes(request.getServletContext().getRealPath("") + File.separator, pc.resurseInd);
                        createBaseRes(ds.patchOutsideProject, pc.resurseInd);
                        projectDb.setLastProject(String.valueOf(ds.userId), String.valueOf(id));
                        sendResult(response, gson.toJson(pc));
                    }
                    break;

                case "/project/save":
                    pc = null;
                    try {
                        pc = gson.fromJson(getStringRequest(request), ProjectM.class);
                    } catch (JsonSyntaxException | IOException e) {
                        System.out.println(e);
                        sendError(response, "Input Error " + e.toString());
                    }
                    if (pc != null) {
                        projectDb.updateProject(pc);
                        sendResultOk(response);
                    }
                    break;
                case "/project/list":
                    listProject = projectDb.getListProject(ds.userId);
                    sendResult(response, gson.toJson(listProject));
                    break;
                case "/project/getproject":
                    String idPr = request.getParameter("id");
                    projectDb.setLastProject(String.valueOf(ds.userId), idPr);
                    sendResult(response, gson.toJson(projectDb.getProjectById(idPr)));
                    break;
                case "/project/change":
                    String projectId = request.getHeader("projectId");
                    String stReq = "";
                    try {
                        stReq = getStringRequest(request);
                    } catch (IOException e) {
                        System.out.println(e);
                        sendError(response, "Project create error " + e.toString());
                    }
                    if (stReq != null && stReq.length() > 0) {
                        pc = null;
                        pc = gson.fromJson(stReq, ProjectM.class);
                        if (pc != null) {
                            pc.userId = ds.userId;
                            if (pc.logo == null) {
                                pc.logo = "";
                            }
                            if (pc.comment == null) {
                                pc.comment = "";
                            }
                            projectDb.changeProject(pc, projectId);
                            sendResult(response, gson.toJson(projectDb.getProjectById(projectId)));
//                            sendResultOk(response);
                        }
                    }
                    break;
                case "/project/getparam":
                    sendResult(response, projectDb.getQueryList(SQL.getParam));
                    break;
            }
    }
    
    @Override
    public int needToLogin() {
        return 2;
    }
    
    private void createBaseRes(String basePath, String resurseInd) {
        String projectPath = basePath + "/" + Constants.PROJECTS_DATA + resurseInd + "/res";
        formDir(projectPath);
        copyDir(basePath + "/mipmap/res", projectPath);
        
    }
    
    private String formStrings(String appName) {
        List<ItemResurces> li = new ArrayList();
        ItemResurces ir = new ItemResurces();
        ir.itemId = 0;
        ir.itemName = "app_name";
        ir.itemValue = appName;
        li.add(ir);
        return gson.toJson(li);
    }
    
    private String formStyle() {
        List<ItemStyle> li = new ArrayList();
        ItemStyle is = new ItemStyle();
        is.styleName = "AppTheme";
        List<ItemResurces> listItem = new ArrayList();
        listItem.add(new ItemResurces("parent", "Theme.AppCompat.Light.NoActionBar"));
        listItem.add(new ItemResurces("colorPrimary", "@color/primary"));
        listItem.add(new ItemResurces("colorPrimaryDark", "@color/primaryDark"));
        listItem.add(new ItemResurces("colorAccent", "@color/accent"));
        is.listItem = listItem;
        li.add(is);
        
        is = new ItemStyle();
        is.styleName = "st_title";
        listItem = new ArrayList();
        listItem.add(new ItemResurces("android:textSize", "24sp"));
        listItem.add(new ItemResurces("android:textColor", "@color/title"));
        is.listItem = listItem;
        li.add(is);
        return gson.toJson(li);
    }
    
    private String formDrawable() {
        List<ItemResurces> li = new ArrayList();
        return gson.toJson(li);
    }
    
    private String formAppParam() {
        List<ItemAppParam> li = new ArrayList();
        return gson.toJson(li);
    }

    private String formScreens() {
        ListScreen ls = new ListScreen();
//        List<ScreenM> ls = new ArrayList();
        return gson.toJson(ls);
    }

    private String formDimens() {
        List<ItemResurces> li = new ArrayList();
        ItemResurces item = new ItemResurces();
        item.itemId = 0;
        item.itemName = "dim_10";
        item.itemValue = "10dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 1;
        item.itemName = "dim_12";
        item.itemValue = "12dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 2;
        item.itemName = "dim_14";
        item.itemValue = "14dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 3;
        item.itemName = "dim_16";
        item.itemValue = "16dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 4;
        item.itemName = "dim_18";
        item.itemValue = "18dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 5;
        item.itemName = "dim_20";
        item.itemValue = "20dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 6;
        item.itemName = "dim_24";
        item.itemValue = "24dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 7;
        item.itemName = "dim_28";
        item.itemValue = "28dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 8;
        item.itemName = "dim_32";
        item.itemValue = "32dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 9;
        item.itemName = "dim_48";
        item.itemValue = "48dp";
        li.add(item);
        
        li.add(resurseItem(10, "d_h_tool", "56dp"));
        
        return gson.toJson(li);
    }
    
    private String formColor() {
        List<ItemResurces> li = new ArrayList();
        ItemResurces item;
        item = new ItemResurces();
        item.itemId = 0;
        item.itemName = "primary";
        item.itemValue = "#51aeffff";
        li.add(item);

        item = new ItemResurces();
        item.itemId = 1;
        item.itemName = "primaryDark";
        item.itemValue = "#007eedff";
        li.add(item);
        item = new ItemResurces();
        item.itemId = 2;
        item.itemName = "primaryLight";
        item.itemValue = "#a3d4ffff";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 3;
        item.itemName = "accent";
        item.itemValue = "#ffe854ff";
        li.add(item);

        item = new ItemResurces();
        item.itemId = 4;
        item.itemName = "accentDark";
        item.itemValue = "#f2d100ff";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 5;
        item.itemName = "accentLight";
        item.itemValue = "#fff199ff";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 6;
        item.itemName = "grey";
        item.itemValue = "#cccccc";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 7;
        item.itemName = "greyDark";
        item.itemValue = "#bbbbbb";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 8;
        item.itemName = "greyLight";
        item.itemValue = "#eeeeee";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 9;
        item.itemName = "error";
        item.itemValue = "#ff7755";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 10;
        item.itemName = "errorDark";
        item.itemValue = "#ff0000";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 11;
        item.itemName = "errorLight";
        item.itemValue = "#ff5544";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 12;
        item.itemName = "text";
        item.itemValue = "#444444";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 13;
        item.itemName = "title";
        item.itemValue = "#000000";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 14;
        item.itemName = "comment";
        item.itemValue = "#888888";
        li.add(item);
        
        li.add(resurseItem(15, "black_50", "#00000088"));
        li.add(resurseItem(16, "black", "#000000"));
        li.add(resurseItem(17, "black_20", "#00000032"));
        
        li.add(resurseItem(18, "white_50", "#ffffff88"));
        li.add(resurseItem(19, "white", "#ffffff"));
        li.add(resurseItem(20, "white_20", "#ffffff32"));

        return gson.toJson(li);
        
    }
    
    private ItemResurces resurseItem(int id, String nameItem, String valueItem) {
        ItemResurces item = new ItemResurces();
        item.itemId = id;
        item.itemName = nameItem;
        item.itemValue = valueItem;
        return item;
    }   
}