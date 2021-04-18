package servlets;

import android.AndroidPar;
import android.ColorSet;
import android.ComponParam;
import android.Corners;
import android.Drawable;
import android.ItemChange;
import android.SeekBarParam;
import android.TabLayout;
import com.google.gson.JsonSyntaxException;
import db.ProjectDB;
import entity.Component;
import entity.DataServlet;
import entity.ListAppParam;
import entity.ListComponent;
import entity.ListItemResurces;
import entity.ListItemStyle;
import entity.ListScreen;
import entity.ParamSave;
import entity.Screen;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import projects.DataList;
import projects.Handler;
import projects.InitData;
import projects.ItemAppParam;
import projects.ItemInitData;
import projects.ItemResurces;
import projects.ItemStyle;
import projects.MenuItem;
import projects.MenuList;
import projects.Model;
import projects.Navigator;
import projects.Options;
import projects.Param;
import projects.ProjectM;

@WebServlet(name = "ExportResult", urlPatterns = {"/export/*"})
public class ExportResult extends BaseServlet {
    
    private String tab4 = "    ", tab8 = "        ", tab12 = "            ", tab16 = "                ", tab20 = "                    ";

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
        ProjectM projectM;
        ProjectDB projectDb = new ProjectDB(request);
        long projectId;
        String SAVE_DIR = "";
        String zipFileName;
        String idPr = request.getParameterValues("projectId")[0];
        projectId = Long.valueOf(idPr);
        projectM = projectDb.getProjectById(idPr);
        zipFileName = createRandomStr(10) + ".zip";
        ItemChange[] arChange;
        ParamSave parSave = new ParamSave();
        parSave.nameAPP = projectM.nameAPP;
        parSave.colors = gson.fromJson(projectM.colors, ListItemResurces.class);
        parSave.styles = gson.fromJson(projectM.style, ListItemStyle.class);
        parSave.drawable = gson.fromJson(projectM.drawable, ListItemResurces.class);
        parSave.strings = gson.fromJson(projectM.strings, ListItemResurces.class);
        parSave.addApp = new ArrayList();
        parSave.addPermish = new HashSet();
        String basePath = ds.patchOutsideProject;
        String realPath = request.getServletContext().getRealPath("");
        String userPath = Constants.USERS_DATA + ds.userResurseInd + "/";
        String userProjPath = Constants.USERS_DATA + ds.userResurseInd + "/" + projectM.nameProject;
        String projectPath = Constants.PROJECTS_DATA + projectM.resurseInd;
        String resPath = userProjPath + "/app/src/main/res";
        String pack = projectM.namePackage.replaceAll("\\.", "/");
        String javaPath = userProjPath + "/app/src/main/java/" + pack;
        int lengthBase = (basePath + userPath).length();
        setColorAlpha(projectM);

        switch (ds.query) {
            case "/export/apk":
            case "/export/android":
                createBaseProject(realPath, basePath,  userProjPath, basePath + projectPath);
                createDepro(basePath + javaPath, projectM, parSave);
                createAppParam(basePath + javaPath, projectM, parSave);
                arChange = new ItemChange[] {
                    new ItemChange("#pack#", projectM.namePackage),
                    new ItemChange("#start_act#", parSave.nameClassStart),
                    new ItemChange("#start_screen#", parSave.nameScreenStart.toUpperCase()),
                    new ItemChange("#proj#", projectM.nameProject)
                };
                createLayout(basePath + resPath, parSave);
                createValue(basePath + resPath, parSave);
                createDrawable(basePath + resPath, parSave);
                
                setFileAndroid(realPath + "/android_base/gradle_mod", basePath + userProjPath + "/app/build.gradle", arChange);
                setFileAndroid(realPath + "/android_base/start_activity", basePath + javaPath + "/" + parSave.nameClassStart + ".java", arChange);
                setManifestAndroid(realPath + "/android_base/manifest", basePath + userProjPath + "/app/src/main/AndroidManifest.xml", arChange, parSave);
                setFileAndroid(realPath + "/android_base/my_app", basePath + javaPath + "/MyApp.java", arChange);
                copyFile(realPath + "/android_base/gradle_proj", basePath + userProjPath + "/build.gradle");
                copyFile(realPath + "/android_base/gradle_prop", basePath + userProjPath + "/gradle.properties");
                copyFile(realPath + "/android_base/git_ignor", basePath + userProjPath + "/.gitignore");
                copyFile(realPath + "/android_base/git_ignor_app", basePath + userProjPath + "/app/.gitignore");
                setFileAndroid(realPath + "/android_base/settings", basePath + userProjPath + "/settings.gradle", arChange);

                
                if (ds.query.equals("/export/apk")) {
                    PrintWriter writer;
                    try {
                        writer = new PrintWriter(basePath + userProjPath +  "/local.properties", "UTF-8");
                        if (isSerwer) {
                            writer.println("sdk.dir=/home/jura/android/cmdline-tools");
                        } else {
                            writer.println("sdk.dir=C\\:\\\\Users\\\\jura\\\\AppData\\\\Local\\\\Android\\\\Sdk");
                        }
                        writer.close();
                    } catch (FileNotFoundException | UnsupportedEncodingException ex) {
                        System.out.println("Error form local.properties " + ex);
                    }
                    
                    List<String> progr = new ArrayList();
                    if (isSerwer) {
                        progr.add("/opt/gradle/gradle-5.5/bin/gradle");
                    } else {
                        progr.add("gradle.bat");
                    }
                    progr.add("build");
                    
                    String pathProject = basePath + userProjPath;
                    ProcessBuilder builder;
                    Process process;
// System.out.println("pathProject="+pathProject+"<< progr="+progr.get(0)+"<<");

                    builder = new ProcessBuilder(progr);
                    builder = builder.directory(new File(pathProject));

                    try {
                        process = builder.start();
                    } catch (IOException ex) {
                        System.out.println("Compile Process Error="+ ex + "\n");
                        return;
                    }

                    try ( BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream())) ) {
                        String line;
                        while ((line = br.readLine()) != null) {
                            if (line != null) {
                                System.out.println(line);
                            }
                        }
                    } catch (IOException | NullPointerException ex) {
                        System.out.println("Compil WRITE Error="+ ex);
                    }

                    try {
                        process.waitFor();
                    } catch (InterruptedException ex) {
                        System.out.println("Compil waitFor Error="+ ex);
                    }

                    String resultFile = userPath + projectM.nameProject + "/app/build/outputs/apk/debug/app-debug.apk";
                    System.out.println("resultFile="+resultFile);
                    sendResult(response, resultFile);
                } else {
                    String exportFileName = userPath + projectM.nameProject + ".zip";
                    zipRes(basePath + exportFileName, basePath + userProjPath, lengthBase);
//                    sendResult(response, downloadExport_1 + exportFileName + downloadExport_2);
                    String resultFile = userPath + projectM.nameProject + "/app/build/outputs/apk/debug/app-debug.apk";
                    System.out.println("resultFile="+exportFileName);
                    sendResult(response, exportFileName);
                }
                break;
        }
    }
    
    private void createBaseProject(String realPath, String basePath, String userPath, String projectPath) {
        String userRes = basePath + userPath + "/app/src/main/res";
        formDir(basePath + userPath);
        formDir(userRes);
        String mipmap = userRes + "/mipmap";
        File file = new File(mipmap);
        if ( ! file.exists()) {
            copyDir(realPath + "/mipmap/res", projectPath + "/res");
        }
        copyDir(projectPath + "/res", userRes);
    }
    
    private void createAppParam(String path, ProjectM pr, ParamSave parSave) {
        parSave.nameScreenStart = "MAIN";
        parSave.nameClassStart = "MainActivity";
        try {
            ListAppParam param = gson.fromJson(pr.appParam, ListAppParam.class);
            try (FileWriter writer = new FileWriter(path + "/MyParams.java", false)) {
                writer.write("package " + pr.namePackage + ";\n\n");
                writer.write("import com.dpcsa.compon.param.AppParams;\n\n");
                writer.write("public class MyParams extends AppParams {\n\n");
                writer.write("    @Override\n");
                writer.write("    public void setParams() {\n\n");
                if (param != null) {
                    for (ItemAppParam iap : param) {
                        switch (iap.name) {
                            case "ScreenStart":
                                parSave.nameScreenStart = iap.value;
                                break;
                            case "ActivityStart":
                                parSave.nameClassStart = iap.value;
                                break;
                            case "geoApiKey":
                                String idGeo = formStringId("geoApiKey", iap.value, parSave.listString);
                                parSave.addApp.add("\n" + tab8 + "<meta-data");
                                parSave.addApp.add("\n" + tab12 + "android:name=\"com.google.android.geo.API_KEY\"");
                                parSave.addApp.add("\n" + tab12 + "android:value=\"@string/geoApiKey\"/>");
                                break;
                            default:
                                switch (iap.type) {
                                    case 0: // число
                                    case 2: // boolean
                                        writer.write(tab8 + iap.name + " = " + iap.value + ";\n");
                                        break;
                                    case 1: // строка
                                        writer.write(tab8 + iap.name + " = \"" + iap.value + "\";\n");
                                        break;
                                }
                        }
                    }
                }
                writer.write("    }\n");
                writer.write("}\n");
                writer.flush();
            }
        } catch (IOException ex) {
            System.out.println("ExportResult createAppParam error=" + ex);
        }
        
    }
    
    private void createDepro(String path, ProjectM pr, ParamSave parSave) {
        formDir(path);
        ItemResurces iRes;
        List<ItemResurces> listString = parSave.getListString();
        List<String> menu = new ArrayList();
        parSave.arrayString = new ArrayList();
        List<String> declare = new ArrayList();
        HashSet<String> importD = new HashSet();
        try {
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream(path + "/MyDeclare.java"), "UTF8"));
            parSave.sreens = gson.fromJson(pr.screens, ListScreen.class);
            int ik = parSave.sreens.size();
            int ik1 = ik - 1;
            int z = 3;
            String st = "        ";
            String sep;
            for (int i = 0; i < ik; i++) {
                if (z == 3) {
                    if (i > 0) {
                        declare.add(st + "\n");
                    }
                    st = "        ";
                    z = 0;
                }
                z++;
                if (i == ik1) {
                    sep = ";";
                } else {
                    sep = ", ";
                }
                String name = parSave.sreens.get(i).screenName.toUpperCase();
                st += name + " = \"" + name + "\"" + sep;
            }
            declare.add(st + "\n\n");
            declare.add("    @Override\n");
            declare.add("    public void declare() {\n\n");

            for (int i = 0; i < ik; i++) {
                Screen sc = parSave.sreens.get(i);
                String scName = sc.screenName.toLowerCase();
                String type = "activity";
                if (sc.typeScreen == 1) {
                    type = "fragment";
                }
                String anim = "";
                if (sc.animate > 0) {
                    anim = ".animate(AS." + Constants.animate[sc.animate] + ")";
                }
                String endScr = ")" + anim + ";\n";
                int jk = sc.components.size();
                boolean isNavSet = false;
                if (sc.navigator != null && sc.navigator.size() > 0) {
                    isNavSet = true;
                }
                if (sc.initData != null && sc.initData.size() > 0) {
                    isNavSet = true;
                }
                if (jk > 0 || isNavSet) {
                    endScr = ")" + anim + "\n";
                }
                String tit = "";
                if (sc.title != null && sc.title.length() > 0) {
                    tit = ", " + formStringId(scName, "screen", "title", sc.title, listString);
                }
                String titPar = "";
                if (sc.titleParam != null && sc.titleParam.length() > 0) {
                    titPar = ", \"" + sc.titleParam.toLowerCase() + "\"";
                }
                declare.add("        " + type + "(" + scName.toUpperCase() + ", R.layout." + type + "_" + scName + tit + titPar + endScr);
                
                String startNavig = formStartNavigator(sc.navigator, tab16, tab12 + ".");
                String sepSatrtNav;
                if (startNavig.length() > 0) {
                    sepSatrtNav = ",\n";
                } else {
                    sepSatrtNav = "";
                }
                for (int j = 0; j < jk; j++) {
                    Component comp = sc.components.get(j);
                    if (comp.type.equals(Constants.LIST)) {
                        if (comp.options != null && comp.options.isCascade != null && comp.options.isCascade) {
                            if (comp.options.first) {
                                startNavig += sepSatrtNav + "cleanCopyVar(\"" + comp.options.nameGlob + "\")";
                                sepSatrtNav = ",\n";
                            }
                        }
                    }
                }
                
                String initData = "";
                if (sc.initData != null && sc.initData.size() > 0) {
                    int dk = sc.initData.size();
                    String sepInitData = tab16;
                    for (int d = 0; d < dk; d++) {
                        ItemInitData id = sc.initData.get(d);
                        switch (id.typeSource) {
                            case "SIZE":
                                initData += sepInitData + "set(R.id." + id.viewId + ", TS.SIZE, R.id." + id.idComp + ")";
                                break;
                            case "PARAM":
                                String listPar = "";
                                if (id.param != null && id.param.length() > 0) {
                                    listPar = ", \"" + id.param + "\"";
                                }
                                initData += sepInitData + "setParam(R.id." + id.viewId + listPar + ")";
                                break;
                        }
                        sepInitData = tab16 + ",\n";
                    }
                }
                
                if (initData.length() > 0) {
                    declare.add(tab16 + ".setValue(" + initData + ")\n");
                }
                
                if (startNavig.length() > 0) {
                    declare.add(tab16 + ".startNavigator(" + startNavig + ")\n");
                }
                
                if (sc.navigator != null && sc.navigator.size() > 0) {
                    String endScrNav = "";
                    if (jk == 0) {
                        endScrNav = ";";
                    }
                    declare.add(formNavigator(sc.navigator, tab16, tab12 + ".") + endScrNav + "\n");
                }
                int jk1 = jk - 1;
                MenuList ml;
                String nameMenu;
                int mk, mk1;
                boolean noStart;
                String navList;
                for (int j = 0; j < jk; j++) {
                    Component comp = sc.components.get(j);
                    String cViewId = comp.view.viewId.toLowerCase();
                    String endComp = ")\n";
                    if (j == jk1) {
                        endComp = ");\n\n";
                    }
                    switch (comp.type) {
                        case Constants.LIST:
                            navList = "";
                            if (comp.options != null && comp.options.isCascade != null && comp.options.isCascade) {
                                navList = formNavigatorList(comp.navigator, comp.options, tab20, ",\n" + tab16);
                            } else {
                                navList = formNavigator(comp.navigator, tab20, ",\n" + tab16);
                            }
                            declare.add(tab12 + ".list(" + formModel(comp)
                                    + "\n" + tab16 + formView(comp, scName) + navList + endComp);
                            break;
                        case Constants.SCROLL:
                        case Constants.PANEL:
                            String noData = "";
                            if (comp.view.no_data != null && comp.view.no_data.length() > 0) {
                                noData = ".noDataView(R.id." + comp.view.no_data + ")";
                            }
                            declare.add(tab12 + ".component(TC.PANEL, " + formModel(comp)
                                    + "\n" + tab16 + "view(R.id." + comp.view.viewId + ")" + noData + formNavigator(comp.navigator, tab20, ",\n" + tab16) + endComp);
                            break;
                        case Constants.FORM:
                            declare.add(tab12 + ".component(TC.PANEL_ENTER, " + formModel(comp)
                                    + "\n" + tab16 + "view(R.id." + comp.view.viewId + ")" + formNavigator(comp.navigator, tab20, ",\n" + tab16) + endComp);
                            break;
                        case Constants.PAGER:
                            Component compTab = getComponentById(sc.components, comp.view.tabLayout);
                            if (compTab != null) {
                                declare.add(tab12 + ".component(TC.PAGER_F, view(R.id." + cViewId + ",\n");
                                declare.add(tab16 + formViewPager(compTab, scName, parSave) + endComp);
                            }
                            break;
                        case Constants.DRAWER:
                            declare.add(tab12 + ".drawer(R.id." + cViewId + ", R.id.container_fragm, R.id.left_drawer, null, " 
                                    + comp.view.drawer_fragm.toUpperCase() + endComp);
                            break;
                        case Constants.TOOL:
                            declare.add("            .toolBar(R.id." + cViewId + endComp);
                            break;
                        case Constants.MENU_B:
                            if (noDrawer(sc.components) && sc.typeScreen == 0) {
                                declare.add("            .fragmentsContainer(R.id.container_fragm)\n");
                            }
                            ml = comp.model.menuList;
                            nameMenu = "menu" + firstUpperCase(scName) + firstUpperCase(cViewId);
                            importD.add(Constants.importMenu);
                            menu.add("    Menu " + nameMenu + " = new Menu()\n");
                            mk = ml.list.size();
                            mk1 = mk - 1;
                            noStart = true;
                            for (int m = 0; m < mk; m++) {
                                String startScr;
                                MenuItem mi = ml.list.get(m);
                                String endM = ")\n";
                                if (m == mk1) {
                                    endM = ");\n";
                                }
                                String screenM = ", \"\"";
                                if (mi.screen != null && mi.screen.length() > 0) {
                                    screenM = ", " + mi.screen.toUpperCase();
                                }
                                if (mi.start != null && mi.start && noStart) {
                                    startScr = ", true";
                                    noStart = false;
                                } else {
                                    startScr = "";
                                }
                                String stIcon = "0";
                                if (mi.icon != null && mi.icon.length() > 0) {
                                    stIcon = dravableFromUrl(mi.icon);
                                }
                                menu.add("        .item(" + stIcon + ", "
                                        + formStringId(scName, cViewId, String.valueOf(m), mi.title, listString) + screenM + startScr + endM);
                            }
                            String navMenuB = "";
                            if (comp.navigator != null && comp.navigator.size() > 0) {
                                navMenuB = navigatorMenuB(comp.navigator, mk);
                            }
                            declare.add("            .menuBottom(model(" + nameMenu + "), view(R.id." + cViewId + ")" + navMenuB + endComp);
                            break;
                        case Constants.MENU:
                            ml = comp.model.menuList;
                            nameMenu = "menu_" + firstUpperCase(scName) + "_" + firstUpperCase(cViewId);
                            importD.add(Constants.importMenu);
                            menu.add("    Menu " + nameMenu + " = new Menu()\n");
/*
                            menu.add("    Menu " + nameMenu + " = new Menu(" + findColorResourse(ml.colorNormId, parSave.colors) + ", "
                                    + findColorResourse(ml.colorSelId, parSave.colors) + ")\n");
*/
                            mk = ml.list.size();
                            mk1 = mk - 1;
                            noStart = true;
                            for (int m = 0; m < mk; m++) {
                                MenuItem mi = ml.list.get(m);
                                String startScr;
                                String endM = ")\n";
                                if (m == mk1 && ! (mi.divider != null && mi.divider)) {
                                    endM = ");\n";
                                }
                                String screenM = ", \"\"";
                                if (mi.screen != null && mi.screen.length() > 0) {
                                    screenM = ", " + mi.screen.toUpperCase();
                                }
                                
                                if (mi.start != null && mi.start && noStart) {
                                    startScr = ", true";
                                    noStart = false;
                                } else {
                                    startScr = "";
                                }
                                menu.add("        .item(" + dravableFromUrl(mi.icon) + ", "
                                        + formStringId(scName, cViewId, String.valueOf(m), mi.title, listString) + screenM + startScr + endM);
                                if (mi.divider != null && mi.divider) {
                                    if (m == mk1) {
                                        menu.add("        .divider();");
                                    } else {
                                        menu.add("        .divider()");
                                    }
                                }
                            }
                            declare.add("            .menu(model(" + nameMenu + "), view(R.id." + cViewId + ")" + endComp);
                            break;
                        case Constants.MAP:
                            String zoom;
                            Param par = comp.param;
                            importD.add(Constants.importParamMap);
                            if (par.levelZoom == null || par.levelZoom.length() == 0) {
                                zoom = "";
                            } else {
                                zoom = ".levelZoom(" + par.levelZoom + "f)";
                            }
                            String contr = "";
                            if ( (comp.view.targetButton != null && comp.view.targetButton) || (comp.view.zoomButtons != null && comp.view.zoomButtons)) {
                                String targ = "false";
                                if (comp.view.targetButton != null && comp.view.targetButton) {
                                    targ = "true";
                                }
                                String zoo = "false";
                                if (comp.view.zoomButtons != null && comp.view.zoomButtons) {
                                    zoo = "true";
                                }
                                contr = "\n" + tab16 + ".mapControls(" + targ + "," + zoo + ")";
                            }
                            String coord = "";
                            if (par.longitude != null && par.latitude != null) {
                                String lat = "0", lon = "0";
                                if (par.longitude.length() != 0) {
                                    lon = par.longitude;
                                }
                                if (par.latitude.length() != 0) {
                                    lat = par.latitude;
                                }
                                coord = "\n" + tab16 + ".coordinateValue(" + lat + "," + lon + ")";
                            }
                            String mod = formModel(comp);
                            String nav = "";
                            if (comp.navigator.size() == 0) {
                                nav = ", null";
                            } else {
                                nav = formNavigator(comp.navigator, tab20, ",\n" + tab16);
                            }
                            declare.add(tab12 + ".componentMap(R.id." + cViewId + ", " + mod
                                    + "\n" + tab16 + "new ParamMap(true)" + zoom + coord + formMarker(comp) + contr + nav + endComp);
                            parSave.addPermish.add("<uses-permission android:name=\"android.permission.ACCESS_FINE_LOCATION\"/>");
                            parSave.addPermish.add("<uses-permission android:name=\"android.permission.ACCESS_COARSE_LOCATION\"/>");
                            break;
                        case Constants.TAGS:
                            navList = formNavigator(comp.navigator, tab20, ",\n" + tab16);
                            declare.add(tab12 + ".component(TC.TAGS, " + formModel(comp)
                                    + "\n" + tab16 + formView(comp, scName) + navList + endComp);
                            break;
                        case Constants.PLUS_MINUS:
                            navList = formNavigator(comp.navigator, tab20, ",\n" + tab16);
                            declare.add(tab12 + ".plusMinus(R.id." + comp.view.viewId + ", R.id." + comp.view.plusId + ", R.id." + comp.view.minusId + navList + endComp);
                            break;
                    }
                }
            }
            writer.write("package " + pr.namePackage + ";\n\n");
            writer.write("import com.dpcsa.compon.base.DeclareScreens;\n");
            for (String stI : importD) {
                writer.write(stI);
            }
            writer.write("\n");
            writer.write("public class MyDeclare extends DeclareScreens {\n\n");
            writer.write("    public final static String\n");
            for (String stD : declare) {
                writer.write(stD);
            }
            writer.write("    }\n");
            int mk = menu.size();
            if (mk > 0) {
                writer.write("\n");
                for (int m = 0; m < mk; m++) {
                    writer.write(menu.get(m));
                }
            }
            
            writer.write("\n}\n");
            writer.flush();
            writer.close();
        } catch (IOException ex) {
            System.out.println("ExportResult createDimens error=" + ex);
        }
    }
    
    private boolean noDrawer(ListComponent components) {
        for (Component comp : components) {
            if (comp.type.equals(Constants.DRAWER)) {
                return false;
            }
        }
        return true;
    }
    
    private Component getComponentById(ListComponent components, String id) {
        for (Component comp : components) {
            if (comp.view.viewId.equals(id)) {
                return comp;
            }
        }
        return null;
    }
    
    private String formModel(Component comp) {
        Model m = comp.model;
        String res = "model(";
        String stPar;
        switch (m.method) {
            case Constants.TEST:
                res += "JSON, " + gson.toJson(comp.model.testData) + "),";
                break;
            case Constants.POST:
                res += "POST, ";
            case Constants.GET:
                if (m.url == null || m.url.length() == 0) {
                    return "";
                }
                res += formUrl(comp);
                if (m.param != null && m.param.length() > 0) {
                    res += ", " + formUrlParam(comp);
                }
                res += "),";
                break;
            case Constants.PARAMETERS:
                stPar = "";
                if (m.param != null && m.param.length() > 0) {
                    stPar += ", " + formUrlParam(comp);
                }
                res += "PARAMETERS" + stPar + "),";
                break;
            case Constants.GLOBAL:
                stPar = "";
                if (m.param != null && m.param.length() > 0) {
                    stPar += ", " + formUrlParam(comp);
                }
                res += "GLOBAL" + stPar + "),";
                break;
            case Constants.PROFILE:
                res += "PROFILE),";
                break;
            case Constants.NULL:
                res = "null,";
        }
        return res;
    }
    
    private String formMarker(Component comp) {
        Param par = comp.param;
        String myM = "0, ", m = "0";
        boolean myB = false, mB = false;
        if (par.myMarker != null && par.myMarker.length() > 0) {
            myM = dravableFromUrl(par.myMarker) + ", ";
            myB = true;
        }
        if (par.marker != null && par.marker.length() > 0) {
            m = dravableFromUrl(par.marker);
            mB = true;
        }
        if (mB || myB) {
//            .markerClick(R.id.infoWindow, true),
            
            
            String mc = "";
            if (comp.model.data != null && comp.model.data.size() > 0) {
                mc = "\n" + tab16 + ".markerClick(R.id.mark_" +comp.view.viewId + ", false)";
            }
            return "\n" + tab16 + ".markerImg(" + myM + m + ")" + mc;
        } else {
            return "";
        }
    }
    
    private String formUrl(Component comp) {
        return inDoubleQuotes(comp.model.url);
    }
    
    private String formUrlParam(Component comp) {
        return inDoubleQuotes(comp.model.param);
    }
    
    private String formNavigatorList(Navigator navigator, Options opt, String tab, String beg) {
        int ik = navigator.size();
        String res = beg + "navigator(";
        String sep = ",\n" + tab;
        if (opt.nextId != null && opt.nextId.length() > 0) {
            res += "addVar(R.id." + opt.nextId + ", \"" + opt.nameGlob + "\", \"" + opt.listVar + "\")";
        } else {
            sep = "";
        }
        res += sep + "addVar(R.id." + opt.enterId + ", \"" + opt.nameGlob + "\", \"" + opt.listVar + "\")";
        sep = ",\n" + tab;
        res += sep + "delVarFollow(R.id." + opt.enterId + ", \"" + opt.nameGlob + "\", \"" + opt.listVar + "\")";
        res += sep + "backOk(R.id." + opt.enterId + ")";
        if (ik > 0) {
            for (int i = 0; i < ik; i++) {
                if ( ! navigator.get(i).after) {
                    res += sep + formHandler(navigator, i, false);
                }
            }
        }
        res += ")";
        return res;
    }
    
    private String formStartNavigator(Navigator navigator, String tab, String beg) {
        int ik = navigator.size();
        if (ik > 0) {
            String res = "";
            String sep = "";
            for (int i = 0; i < ik; i++) {
                Handler hh = navigator.get(i);
                if ( ! hh.after && hh.viewId.equals("Execute at startup screen")) {
                    res += sep + formHandler(navigator, i, false);
                    sep = ",\n" + tab;
                }
            }
            return res;
        } else {
            return "";
        }
    }
    
    private String formNavigator(Navigator navigator, String tab, String beg) {
        int ik = navigator.size();
        if (ik > 0) {
            String res = beg + "navigator(";
            String sep = "";
            for (int i = 0; i < ik; i++) {
                Handler hh = navigator.get(i);
                if ( ! hh.after && ! hh.viewId.equals("Execute at startup screen")) {
                    res += sep + formHandler(navigator, i, false);
                    sep = ",\n" + tab;
                }
            }
            res += ")";
            return res;
        } else {
            return "";
        }
    }
    
    private String formHandler(Navigator navigator, int i, boolean menu) {
        Handler hh = navigator.get(i);
        String res = "";
        String stId;
        String parId;
        String sep = "";
        int ik = navigator.size();
        if (menu) {
            stId = "";
        } else {
            if (hh.viewId != null && hh.viewId.length() > 0 && ! hh.viewId.equals("0")) {
                stId = "R.id." + hh.viewId;
            } else {
                stId = "";
            }
        }
        if (hh.id != null && hh.id.length() > 0) {
            parId = "R.id." + hh.id;
        } else {
            parId = "";
        }
        String com = "";
        if (stId.length() > 0 && parId.length() > 0) {
            com = ", ";
        }
        String comSh = "";
        if (stId.length() > 0) {
            comSh = ", ";
        }
        switch (hh.handler) {
            case "start":
                if (stId.length() > 0) {
                    sep = ",";
                } else {
                    sep = "";
                }
                int i_1 = i + 1;
                String stAfter = "";
                if (i_1 < ik) {
                    if (navigator.get(i_1).after) {
                        stAfter = ", after(";
                        String sepAft = "";
                        for (int j = i_1; j < ik; j++) {
                            Handler hAfter = navigator.get(j);
                            if (hAfter.after) {
                                stAfter += sepAft + formHandler(navigator, j, menu);
                                sepAft = ",\n" + tab20;
                            } else {
                                break;
                            }
                        }
                        stAfter += ")";
                    }
                }
                String mustValid = "";
                if (hh.param_1 != null && hh.param_1.length() > 0) {
                    mustValid = formMustValid(hh.param_1);
                }
                res = "start(" + stId + sep + hh.param.toUpperCase() + stAfter + mustValid + ")";
                break;

            case "setVar":
                res = "setVar(R.id." + hh.id + ",\"" + hh.param + "\",\"" + hh.param_1 + "\")";
                break;
            case "hide":
                res = "hide(" + stId + comSh + "R.id." + hh.id + ")";
                break;
            case "show":
                res = "show(" + stId + comSh + "R.id." + hh.id + ")";
                break;
            case "addRecord":
                String vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                res = "handler(" + vId + ", VH.ADD_RECORD, R.id." + hh.id + ")";
                break;
            case "dialUp":
                res = "handler(" + stId+ ", VH.DIAL_UP)";
                break;
            case "springScale":
                res = "springScale(" + parId+ ", 3, 1000)";
                break;
            case "delRecord":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                res = "handler(" + vId + ", VH.DEL_RECORD)";
                break;
            default:
                String par = "";
                if (hh.param != null && hh.param.length() > 0) {
                    par = ", \"" + hh.param + "\"";
                }
                res = hh.handler + "(" + stId + com + parId + par + ")";
        }
        return res;
    }
    
    private String formMustValid(String listView) {
        String res = ", false";
        String[] arr = listView.split(",");
        int ik = arr.length;
        for (int i = 0; i < ik; i++) {
            res += ", R.id." + arr[i];
        }
        return res;
    }
    
    private String navigatorMenuB(Navigator nav, int ik) {
        String res = "";
        int nk = nav.size();
        for (int i = 0; i < ik; i++) {
            String vId = String.valueOf(i);
            String st = "";
            String sep = "";
            for (int n = 0; n < nk; n++) {
                Handler hh = nav.get(n);
                if (hh.viewId != null && hh.viewId.length() > 0 && hh.viewId.equals(vId)) {
                    st += sep + formHandler(nav, n, true);
                    sep = ",";
                }
            }
            if (st.length() == 0) {
                res += ", null";
            } else {
                res += ",\n" + tab20 + "navigator(" + st + ")";
            }
        }
        return res;
    }
    
    private String formView(Component comp, String name) {
        String span = "";
        if (comp.view.spanC > 1) {
            span = ".spanCount(" + comp.view.spanC + ")";
        }
        String visib = "";
        if (comp.view.visibility != null && comp.view.visibility.length() > 0) {
            visib = ".visibilityManager(";
            String[] arr = comp.view.visibility.split(",");
            String sep = "";
            for (int i = 0; i < arr.length; i++) {
                String aI = arr[i];
                visib += sep + "visibility(R.id." + aI + ",\"" + aI + "\")";
            }
            visib += ")";
        }
        String sel = "";
        if (comp.view.selectedType != null) {
            switch (comp.view.selectedType) {
                case "Param":
                    String vv = comp.view.selectedField;
                    if (comp.view.selectedValue != null && comp.view.selectedValue.length() > 0) {
                        vv = comp.view.selectedField + "=" + comp.view.selectedValue;
                    }
                    sel = ".selected(\"" + vv + "\", TVS.PARAM)";
                    break;
                case "Value":
                    sel = ".selected(\"" + comp.view.selectedField + "\", \"" + comp.view.selectedValue +"\")";
                    break;
                case "Locale":
                    sel = ".selected(\"" + comp.view.selectedField + "\")";
                    break;
                case "Multiple":
                    sel = ".selected(\"" + comp.view.amountSelected + "\")";
                    break;
            }
        }

        String ft = "";
        if (comp.model.fieldType != null && comp.model.fieldType.length() > 0) {
            ft = ", \"" + comp.model.fieldType + "\"";
        }
        DataList data = comp.model.data;
        int ik = data.size();
        String stItems = "";
        if (ik > 1) {
            String sep = ", new int[]{";
            for (int i = 0; i < ik; i++) {
                stItems += sep + "R.layout.item_" + name + "_" + comp.view.viewId + "_" + i;
                sep = ",\n" + tab20;
            }
            stItems += "}";
        } else {
            stItems = ", R.layout.item_" + name + "_" + comp.view.viewId + "_0";
        }
        return "view(R.id." + comp.view.viewId + ft + stItems + ")" + visib + span + sel;
    }
    
    private String formViewPager(Component comp, String name, ParamSave parSave) {
        String res = "", arrSt = "";
        List<MenuItem> list = comp.model.menuList.list;
        if (list != null && list.size() > 0) {
            res = tab20 + "new String[] {";
            String sep = "";
            for (MenuItem mi : list) {
                res += sep + mi.screen.toUpperCase();
                arrSt += sep + mi.title;
                sep = ", ";
            }
            res += "})\n";
            res += tab20 + ".setTab(R.id." + comp.view.viewId + ", " + formArrayStringId(arrSt, name + "_" + comp.view.viewId, parSave.arrayString) + ")";
        }
        return res;
    }
    
    private String dravableFromUrl(String url) {
        if (url == null) return "R.drawable.NULL";
        int i = url.lastIndexOf(".");
        int j = url.lastIndexOf("/") + 1;
        String res = "R.drawable." + url.substring(j, i);
        return res;
    }
    
    private String dravableFromName(String url) {
        if (url == null) return "NULL";
        int i = url.lastIndexOf(".");
        int j = url.lastIndexOf("/") + 1;
        return url.substring(j, i);
    }
    
    private String nameFromUrl(String url) {
        int i = url.lastIndexOf(".");
        int j = url.lastIndexOf("/") + 1;
        String res = url.substring(j, i);
        return res;
    }
    
    private String formStringId(String scr, String vievId, String name, String value, List<ItemResurces> listString) {
        if (name != null && name.length() > 0) {
            String nameTit = scr + "_" + vievId+ "_" + name;
            return formStringId(nameTit, value, listString);
        }
        return "";
    }
    
    private String formArrayStringId(String arr, String name, List<String> arrString) {
        String[] arrSt = arr.split(", ");
        arrString.add(tab4 + "<string-array name=\"" + name + "\">\n");
        for (String st : arrSt) {
            arrString.add(tab8 + "<item>" + st + "</item>\n");
        }
        arrString.add(tab4 + "</string-array>\n");
        return "R.array." + name;
    }
    
    private String formStringId(String name, String value, List<ItemResurces> listString) {
        ItemResurces iRes = new ItemResurces();
        iRes.itemName = name;
        iRes.itemValue = value;
        listString.add(iRes);
        return "R.string." + name;
    }
    
    public String firstUpperCase(String word){
        if(word == null || word.isEmpty()) return "";//или return word;
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    }
    
    private void writeToZip(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[1024];
        int len;
        while ((len = in.read(buffer)) >= 0)
            out.write(buffer, 0, len);
        in.close();
    }
    
    private void setColorAlpha(ProjectM projectM) {
        ListItemResurces colors = gson.fromJson(projectM.colors, ListItemResurces.class);
        for (ItemResurces ir : colors) {
            if (ir.itemValue.length() > 7) {
                String a = ir.itemValue.substring(7);
                if (a.equals("ff")) {
                    ir.itemValue = ir.itemValue.substring(0, 7);
                } else {
                    ir.itemValue = "#" + a + ir.itemValue.substring(1, 7);
                }
            }
        }
    }

    private void createLayout(String resPath, ParamSave parSave) {
        String path = resPath + "/layout";
        formDir(path);
        parSave.sreens.forEach((screen) -> {
            createLayout(screen, path, parSave);
        });
    }
    
    private void createLayout(Screen screen, String path, ParamSave parSave) {
        try {
            if (screen.layout != null) {
                parSave.typeScreen = screen.typeScreen;
                String type_screen = "activity_";
                if (screen.typeScreen == 1) {
                    type_screen = "fragment_";
                }
                parSave.currentScreen = screen.screenName;
                parSave.currentScreenObj = screen;
                parSave.toolId = "";
                parSave.menuId = "";
                parSave.scrollId = "";
                parSave.pathLayoutItem = path + "/item_" + screen.screenName.toLowerCase() + "_";
                parSave.path = path;
//                try (FileWriter writer = new FileWriter(path + "/" + type_screen + screen.screenName.toLowerCase() + ".xml", false)) {
                try ( BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream(path + "/" + type_screen + screen.screenName.toLowerCase() + ".xml"), "UTF8"))) {
                    writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
                    parSave.noToolMenu = false;
                    createEl(screen.layout, true, "\n", writer, parSave);
                    writer.flush();
                }
            }
        } catch(IOException ex){
            System.out.println("ExportResult createLayout error=" + ex);
        } catch (JsonSyntaxException ex) {
            System.out.println("ExportResult createLayout JsonSyntaxException=" + ex);
        }
    }
    
    private void createEl(AndroidPar elScreen, boolean first, String tab0, BufferedWriter writer, ParamSave parSave) {
        String typeEl = createOneElement(elScreen, first, tab0, writer, parSave);
        String tab = tab0 + "    ";
        try {
            int ik;
            switch (elScreen.type) {
                case Constants.LIST :
                    writer.write(tab0 + "/>");
                    ik = elScreen.children.size();
                    if (ik == 0) {
                        createItemLayoutBlank(parSave.pathLayoutItem + elScreen.viewId + "_0.xml", parSave);
                    } else {
                        for (int i = 0; i < ik; i++) {
                            createItemLayout(elScreen.children.get(i), parSave.pathLayoutItem + elScreen.viewId + "_" + i + ".xml", parSave);
                        }
                    }
                    break;
                case Constants.SHEET :
                    writer.write(tab0 + "/>");
                    ik = elScreen.children.size();
                    if (ik == 0) {
                        createItemLayoutBlank(parSave.path + "/view_" + parSave.currentScreen.toLowerCase() + "_" + elScreen.viewId + ".xml", parSave);
                    } else {
                        for (int i = 0; i < ik; i++) {
                            createItemLayout(elScreen.children.get(i), parSave.path + "/view_" + parSave.currentScreen.toLowerCase() + "_" + elScreen.viewId + ".xml", parSave);
                        }
                    }
                    break;

                case Constants.TAGS :
                    writer.write(tab0 + "/>");
                    ik = elScreen.children.size();
                    if (ik == 0) {
                        createItemLayoutBlank(parSave.pathLayoutItem + elScreen.viewId + "_0.xml", parSave);
                    } else {
                        for (int i = 0; i < ik; i++) {
                            createItemLayout(elScreen.children.get(i), parSave.pathLayoutItem + elScreen.viewId + "_" + i + ".xml", parSave);
                        }
                    }
                    break;

                default :
                    if (elScreen.children != null && elScreen.children.size() > 0) {
                        writer.write(tab0 + ">");
                        if (parSave.typeScreen == 0 && first) {
                            ik = elScreen.children.size();
                            for (int i = 0; i < ik; i++) {
                                AndroidPar ap = elScreen.children.get(i);
                                if (ap.type.equals(Constants.DRAWER)) {
                                    ListComponent lc = parSave.currentScreenObj.components;
                                    int jk = lc.size();
                                    Component comp = null;
                                    for (int j = 0; j < jk; j++) {
                                        Component c = lc.get(j);
                                        if (c.type.equals(Constants.DRAWER) ) {
                                            comp = c;
                                            break;
                                        }
                                    }
                                    if (comp != null) {
                                        if ((comp.view.toolInDrawer != null && comp.view.toolInDrawer) ||
                                                (comp.view.menubInDrawer != null && comp.view.menubInDrawer)) {
                                            AndroidPar apTool = null, apMenu = null;
                                            for (int j = 0; j < ik; j++) {
                                                AndroidPar apJ = elScreen.children.get(j);
                                                if (apJ.type.equals(Constants.TOOL)) {
                                                    apTool = apJ;
                                                } else {
                                                    if (apJ.type.equals(Constants.MENU_B)) {
                                                        apMenu = apJ;
                                                    }
                                                }
                                            }
                                            createDrawer(ap, apTool, apMenu, tab0, writer, parSave);
                                            parSave.noToolMenu = true;
                                            parSave.noDrawer = true;
                                            parSave.noFragmContainer = true;
                                        } else {
                                            createDrawer(ap, tab0, writer, parSave);
                                            parSave.noFragmContainer = true;
                                            parSave.noDrawer = true;
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                        if (typeEl.equals(Constants.SCROLLPANEL)) {
                            CreateRelativeForScroll(writer, parSave);
                        }
                        elScreen.children.forEach((es) -> {
                            createEl(es, false, tab, writer, parSave);
                        });
                        if (parSave.typeScreen == 0 && first) {
                            if (parSave.menuId.length() > 0) {
                                createFragmentContainer(writer, parSave);
                            }
                        }
                        if (typeEl.equals(Constants.SCROLLPANEL)) {
                            writer.write("\n" + tab8 + "</RelativeLayout>");
                        }
                        writer.write(tab0 + "</" + typeEl + ">");
                    } else {
                        if (typeEl.length() > 0) {
                            writer.write(tab0 + "/>");
                        }
                    }
            }
        } catch (IOException ex) {
            System.out.println("ExportResult createLayout element error=" + ex);
        }
    }
    
    private void createFragmentContainer(BufferedWriter writer, ParamSave parSave) {
        if (parSave.noFragmContainer) return;
        try {
            writer.write("\n" + tab4 + "<FrameLayout\n");
            writer.write(tab8 + "android:id=\"@+id/container_fragm\"\n");
            writer.write(tab8 + "android:layout_width=\"match_parent\"\n");
            writer.write(tab8 + "android:layout_height=\"match_parent\"\n");
            if (parSave.menuId != null && parSave.menuId.length() > 0) {
                writer.write(tab8 + "android:layout_above=\"@id/" + parSave.menuId + "\"\n");
            }
            if (parSave.toolId != null && parSave.toolId.length() > 0) {
                writer.write(tab8 + "android:layout_below=\"@id/" + parSave.toolId + "\"\n");
            }
            writer.write(tab4 + "/>\n");
        } catch (IOException ex) {
            Logger.getLogger(ExportResult.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void CreateRelativeForScroll(BufferedWriter writer, ParamSave parSave) {
        try {
            writer.write("\n" + tab4 + "<RelativeLayout\n");
            writer.write(tab8 + "android:id=\"@+id/" + parSave.scrollId + "\"\n");
            writer.write(tab8 + "android:layout_width=\"match_parent\"\n");
            writer.write(tab8 + "android:layout_height=\"match_parent\">\n");

        } catch (IOException ex) {
            Logger.getLogger(ExportResult.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void createItemLayout(AndroidPar p, String path, ParamSave parSave) {
        try ( BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream(path), "UTF8"))) {    
            writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
            createEl(p, true, "\n", writer, parSave);
            writer.flush();
        } catch(IOException ex){
            System.out.println("ExportResult createLayoutItem error=" + ex);
        } 
    }
    
    private void createItemLayoutBlank(String path, ParamSave parSave) {
        try ( BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream(path), "UTF8"))) {    
                writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
                writer.write("\n<RelativeLayout");
                writer.write("\n    xmlns:android=\"http://schemas.android.com/apk/res/android\"");
                writer.write("\n    android:layout_width=\"match_parent\"");
                writer.write("\n    android:layout_height=\"100dp\">");
                writer.write("\n</RelativeLayout>");
                writer.flush();
        } catch(IOException ex){
            System.out.println("ExportResult createItemLayoutBlank error=" + ex);
        } 
    }
    
    private void createDrawer(AndroidPar elScreen, AndroidPar tool, AndroidPar men, String tab0, BufferedWriter writer, ParamSave parSave) {
        String tab1 = tab0 + "    ", tab2 = tab1 + "    ", tab3 = tab2 + "    ";
        try {
            writer.write(tab0 + "<" + Constants.componType[6]);
            writer.write(tab1 + "android:id=\"@+id/" + elScreen.viewId + "\"");
            writer.write(tab1 + "android:layout_width=\"match_parent\"");
            writer.write(tab1 + "android:layout_height=\"match_parent\">");
            
            writer.write(tab1 + "<RelativeLayout");
            writer.write(tab2 + "android:layout_width=\"match_parent\"");
            writer.write(tab2 + "android:layout_height=\"match_parent\">");
            if (tool != null) {
                createOneElement(tool, false, tab2, writer, parSave);
                writer.write(tab3 + "/>");
            }
            if (men != null) {
                createOneElement(men, false, tab2, writer, parSave);
                writer.write(tab3 + "/>");
            }
            
            writer.write(tab2 + "<FrameLayout");
            writer.write(tab3 + "android:id=\"@+id/container_fragm\"");
            writer.write(tab3 + "android:layout_width=\"match_parent\"");
            writer.write(tab3 + "android:layout_height=\"match_parent\"");
            if (men != null) {
                writer.write(tab3 + "android:layout_above=\"@id/" + parSave.menuId + "\"");
            }
            if (tool != null) {
                writer.write(tab3 + "android:layout_below=\"@id/" + parSave.toolId + "\"");
            }
            writer.write(tab3 + "/>");
            
            writer.write(tab2 + "</RelativeLayout>");
            
            writer.write(tab1 + "<FrameLayout");
            writer.write(tab2 + "android:id=\"@+id/left_drawer\"");
            writer.write(tab2 + "android:layout_width=\"340dp\"");
            writer.write(tab2 + "android:layout_height=\"match_parent\"");
            writer.write(tab2 + "android:background=\"#ffffff\"");
            writer.write(tab2 + "android:layout_gravity=\"start\"/>");
            
            writer.write(tab1 + "</" + Constants.componType[6] + ">");
            
        } catch (IOException ex) {
            Logger.getLogger(ExportResult.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void createDrawer(AndroidPar p, String tab0, BufferedWriter writer, ParamSave parSave) {
        String tab1 = tab0 + "    ", tab2 = tab1 + "    ", tab3 = tab2 + "    ";
        try {
            writer.write(tab0 + "<" + Constants.componType[6]);
            writer.write(tab1 + "android:id=\"@+id/" + p.viewId + "\"");
            writer.write(tab1 + "android:layout_width=\"match_parent\"");
            if (p.below != null && p.below.length() > 0) {
                writer.write(tab1 + "android:layout_below=\"@id/" + p.below + "\"");
            }

            if (p.above != null && p.above.length() > 0) {
                writer.write(tab1 + "android:layout_above=\"@id/" + p.above + "\"");
            }

            writer.write(tab1 + "android:layout_height=\"match_parent\">");
           
            writer.write(tab1 + "<FrameLayout");
            writer.write(tab2 + "android:id=\"@+id/container_fragm\"");
            writer.write(tab2 + "android:layout_width=\"match_parent\"");
            writer.write(tab2 + "android:layout_height=\"match_parent\"/>");

            
            writer.write(tab1 + "<FrameLayout");
            writer.write(tab2 + "android:id=\"@+id/left_drawer\"");
            writer.write(tab2 + "android:layout_width=\"340dp\"");
            writer.write(tab2 + "android:layout_height=\"match_parent\"");
            writer.write(tab2 + "android:background=\"#ffffff\"");
            writer.write(tab2 + "android:layout_gravity=\"start\"/>");
            
            writer.write(tab1 + "</" + Constants.componType[6] + ">");
            
        } catch (IOException ex) {
            Logger.getLogger(ExportResult.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private String createOneElement(AndroidPar p, boolean first, String tab0, BufferedWriter writer, ParamSave parSave) {
        String typeEl = p.type;
        if ((parSave.noToolMenu && (typeEl.equals(Constants.TOOL) || typeEl.equals(Constants.MENU_B)) || 
                (parSave.noDrawer && typeEl.equals(Constants.DRAWER)))) {
            return "";
        }
        if (p.componParam != null && p.componParam.type != null) {
            typeEl = Constants.componType[p.componParam.type];
        }

        switch (p.type) {
            case Constants.TEXTVIEW:
                if (p.componParam != null) { 
                    if (p.componParam.acceptNotif != null && p.componParam.acceptNotif.length() > 0) {
                        typeEl = Constants.TextCompon;
                    }
                    if (p.componParam.typeValidTV != null && ! p.componParam.typeValidTV.equals("no")) {
                        typeEl = Constants.TextValid;
                    }
                    if (p.componParam.grammar != null && p.componParam.grammar.length() > 0) {
                        typeEl = Constants.TextGrammar;
                    }
                }
                break;
            case Constants.TOOL:
                parSave.toolId = p.viewId;
                break;
            case Constants.MENU_B:
                parSave.menuId = p.viewId;
                break;
            case Constants.CARD_VIEW:
                typeEl = Constants.cardViewType;
                break;
            case Constants.IMAGEVIEW:
                if (p.corners != null || (p.componParam != null && p.componParam.oval != null && p.componParam.oval)) {
                    typeEl = Constants.roundedType;
                }
                break;
        }
        try {
            writer.write(tab0 + "<" + typeEl);
            String tab = tab0 + "    ";

            if (first) {
                writer.write(tab + "xmlns:android=\"http://schemas.android.com/apk/res/android\"");
                writer.write(tab + "xmlns:app=\"http://schemas.android.com/apk/res-auto\"");
            }

            if (p.viewId != null && p.viewId.length() > 0) {
                if (typeEl.equals(Constants.SCROLLPANEL)) {
                    parSave.scrollId = p.viewId;
                } else {
                    writer.write(tab + "android:id=\"@+id/" + p.viewId + "\"");
                }
            }
            String w, h;
            if (p.width == Constants.MATCH) {
                w = "match_parent";
            } else if (p.width == Constants.WRAP) {
                w = "wrap_content";
            } else {
                w = dimens(p.width);
            }
            writer.write(tab + "android:layout_width=\"" + w + "\"");
            if (p.height == Constants.MATCH) {
                h = "match_parent";
            } else if (p.height == Constants.WRAP) {
                h = "wrap_content";
            } else {
                h = dimens(p.height);
            }
            writer.write(tab + "android:layout_height=\"" + h + "\"");
            
            if (p.orientataion != null && p.orientataion.length() > 0) {
                writer.write(tab + "android:orientation=\"" + p.orientataion + "\"");
            }
            if (typeEl.indexOf("Sheet") > -1) {
                if (p.background != null && p.background != 17) {
                    writer.write(tab + "app:fadedScreenColor=\""+ findColorByIndex(p.background, parSave.colors) + "\"");
                }
            } else {
                if (p.background != null && p.background >= 0) {
                    if (p.background > 999) {
                        if (p.background > 1999) {      // Selector
                            
                            if (p.background == 100000) {
                                String stSRC = p.src;
                                int ii = stSRC.lastIndexOf(".");
                                int jj = stSRC.lastIndexOf("/");
                                stSRC = stSRC.substring(jj + 1, ii);
                                writer.write(tab + "android:background=\"@drawable/"+ stSRC + "\"");
                            }
                        } else {        // Drawable
                            writer.write(tab + "android:background=\"@drawable/"+findDrawableByIndex(p.background, parSave.drawable) + "\"");
                        }
                    } else {
                        writer.write(tab + "android:background=\""+ findColorByIndex(p.background, parSave.colors) + "\"");
                    }
                }
            }

            if ( ! first) {
                if (p.gravLayout.h == Constants.CENTER && p.gravLayout.v == Constants.CENTER) {
                    writer.write(tab + "android:layout_centerInParent=\"true\"");
                } else {
                    switch(p.gravLayout.h) {
                        case Constants.LEFT:
                            writer.write(tab + "android:layout_alignParentLeft=\"true\"");
                            break;
                        case Constants.RIGHT:
                            writer.write(tab + "android:layout_alignParentRight=\"true\"");
                            break;
                        case Constants.CENTER:
                            writer.write(tab + "android:layout_centerHorizontal=\"true\"");
                            break;
                        case Constants.ABSOLUTE:
                            if (p.left != null && p.left != 0) {
                                writer.write(tab + "android:layout_marginLeft=\"" + dimens(p.left) + "\"");
                            }
                            break;
                    }
                    switch(p.gravLayout.v) {
                        case Constants.TOP:
                            if (p.below == null || p.below.length() == 0) {
                                writer.write(tab + "android:layout_alignParentTop=\"true\"");
                            }
                            break;
                        case Constants.BOTTOM:
                            if (p.above == null || p.above.length() == 0) {
                                writer.write(tab + "android:layout_alignParentBottom=\"true\"");
                            }
                            break;
                        case Constants.CENTER:
                            writer.write(tab + "android:layout_centerVertical=\"true\"");
                            break;
                        case Constants.ABSOLUTE:
                            if (p.top != null) {
                                writer.write(tab + "android:layout_marginTop=\"" + dimens(p.top) + "\"");
                            }
                            break;
                    }
                }
            }
            if (p.gravity != null) {
                if (p.gravity.h == Constants.CENTER && p.gravity.v == Constants.CENTER) {
                    writer.write(tab + "android:gravity=\"center\"");
                } else {
                    String gV = "";
                    String gH = "";
                    String grav = "";
                    switch(p.gravity.h) {
                        case Constants.LEFT:
                            gH = "left";
                            break;
                        case Constants.RIGHT:
                            gH = "right";
                            break;
                        case Constants.CENTER:
                            gH = "center_horizontal";
                            break;
                    }
                    switch(p.gravity.v) {
                        case Constants.TOP:
                            gV = "top";
                            break;
                        case Constants.BOTTOM:
                            gV = "bottom";
                            break;
                        case Constants.CENTER:
                            gV = "center_vertical";
                            break;
                    }
                    if (gV.length() > 0) {
                        if (gH.length() > 0) {
                            grav = gV + "|" + gH;
                        } else {
                            grav = gV;
                        }
                    } else {
                        if (gH.length() > 0) {
                            grav = gH;
                        }
                    }
                    if (grav.length() > 0) {
                        writer.write(tab + "android:gravity=\"" + grav + "\"");
                    }
                }
            }
            
            if ( ! first) {
                if (p.toLeftOf != null && p.toLeftOf.length() > 0) {
                    writer.write(tab + "android:layout_toLeftOf=\"@id/" + p.toLeftOf + "\"");
                }

                if (p.toRightOf != null && p.toRightOf.length() > 0) {
                    writer.write(tab + "android:layout_toRightOf=\"@id/" + p.toRightOf + "\"");
                }

                if (p.below != null && p.below.length() > 0) {
                    writer.write(tab + "android:layout_below=\"@id/" + p.below + "\"");
                }
                if (p.above != null && p.above.length() > 0) {
                    writer.write(tab + "android:layout_above=\"@id/" + p.above + "\"");
                }
            }
            if (p.margin != null && p.margin.length() > 0 && ! p.margin.equals("0")) {
                writer.write(tab + "android:layout_margin=\"" + dimens(p.margin) + "\"");
            }
            if (p.leftMarg != null && p.leftMarg.length() != 0 && ! p.leftMarg.equals("0")) {
                writer.write(tab + "android:layout_marginLeft=\"" + dimens(p.leftMarg) + "\"");
            }
            if (p.topMarg != null && p.topMarg.length() > 0 && ! p.topMarg.equals("0")) {
                writer.write(tab + "android:layout_marginTop=\"" + dimens(p.topMarg) + "\"");
            }
            if (p.rightMarg != null && p.rightMarg.length() > 0 && ! p.rightMarg.equals("0")) {
                writer.write(tab + "android:layout_marginRight=\"" + dimens(p.rightMarg) + "\"");
            }
            if (p.bottomMarg != null && p.bottomMarg.length() > 0 && ! p.bottomMarg.equals("0")) {
                writer.write(tab + "android:layout_marginBottom=\"" + dimens(p.bottomMarg) + "\"");
            }
        
            if (p.padding != null && p.padding.length() > 0 && ! p.padding.equals("0")) {
                writer.write(tab + "android:padding=\"" + dimens(p.padding) + "\"");
            }
            if (p.leftPad != null && p.leftPad.length() > 0 && ! p.leftPad.equals("0")) {
                writer.write(tab + "android:paddingLeft=\"" + dimens(p.leftPad) + "\"");
            }
            if (p.topPad != null && p.topPad.length() > 0 && ! p.topPad.equals("0")) {
                writer.write(tab + "android:paddingTop=\"" + dimens(p.topPad) + "\"");
            }
            if (p.rightPad != null && p.rightPad.length() > 0 && ! p.rightPad.equals("0")) {
                writer.write(tab + "android:paddingRight=\"" + dimens(p.rightPad) + "\"");
            }
            if (p.bottomPad != null && p.bottomPad.length() > 0 && ! p.bottomPad.equals("0")) {
                writer.write(tab + "android:paddingBottom=\"" + dimens(p.bottomPad) + "\"");
            }
            if (p.text != null && p.text.length() > 0) {
                if (p.formResourse != null && p.formResourse) {
                        writer.write(tab + "android:text=\"" + p.text + "\"");
                }
            }

            if (p.textSize != null) {
                switch (p.type) {
                    case Constants.TOOL:
                        writer.write(tab + "app:titleSize=\"" + dimens(p.textSize) + "\"");
                        break;
                    default:
                        writer.write(tab + "android:textSize=\"" + dimens(p.textSize) + "\"");
                        break;
                }
            }
            if (p.textColor != null && p.textColor >= 0) {
                switch (p.type) {
                    case Constants.TOOL:
                        writer.write(tab + "app:titleColor=\"" + findColorByIndex(p.textColor, parSave.colors) + "\"");
                        break;
                    default:
                        writer.write(tab + "android:textColor=\"" + findColorByIndex(p.textColor, parSave.colors) + "\"");
                        break;
                }
            }

            if (p.src != null && p.src.length() > 0) {
                if (p.formResourse != null && p.formResourse) {
                    writer.write(tab + "android:src=\"@drawable/" + dravableFromName(p.src) + "\"");
                }
            }
            if (p.scaleType != null) {
                int iS = p.scaleType;
                if (iS >= Constants.scaleType.length) {
                    iS = Constants.scaleType.length - 1;
                }
                writer.write(tab + "android:scaleType=\"" + Constants.scaleType[iS] + "\"");
            }
            if (p.visibility != null && ! p.visibility) {
                writer.write(tab + "android:visibility=\"gone\"");
            }
            
            switch (p.type) {
                case Constants.TOOL:
                    if (p.imgBack != null && p.imgBack.length() > 0) {
                        writer.write(tab + "app:imgBack=\"@drawable/" + nameFromUrl(p.imgBack) + "\"");
                    }
                    if (p.imgHamburg != null && p.imgHamburg.length() > 0) {
                        writer.write(tab + "app:imgHamburger=\"@drawable/" + nameFromUrl(p.imgHamburg) + "\"");
                    }
                    break;
                case Constants.IMAGEVIEW:
                    Corners pc = p.corners;
                    if (p.componParam != null && p.componParam.oval != null && p.componParam.oval) {
                        writer.write(tab + "app:riv_oval=\"true\"");
                    } else {
                        if (pc != null) {
                            int lt = 0, tr = 0, rb = 0, bl = 0;
                            if (pc.lt.length() > 0) {
                                lt = Integer.valueOf(pc.lt);
                            }
                            if (pc.tr.length() > 0) {
                                tr = Integer.valueOf(pc.tr);
                            }
                            if (pc.rb.length() > 0) {
                                rb = Integer.valueOf(pc.rb);
                            }
                            if (pc.bl.length() > 0) {
                                bl = Integer.valueOf(pc.bl);
                            }
                            if (lt == tr && lt == rb && lt == bl) {
                                if (lt > 0) {
                                    writer.write(tab + "app:riv_corner_radius=\"" + lt + "dp\"");
                                }
                            } else {
                                if (lt > 0) {
                                    writer.write(tab + "app:riv_corner_radius_top_left=\"" + lt + "dp\"");
                                }
                                if (tr > 0) {
                                    writer.write(tab + "app:riv_corner_radius_top_right=\"" + tr + "dp\"");
                                }
                                if (rb > 0) {
                                    writer.write(tab + "app:riv_corner_radius_bottom_right=\"" + rb + "dp\"");
                                }
                                if (bl > 0) {
                                    writer.write(tab + "app:riv_corner_radius_bottom_left=\"" + bl + "dp\"");
                                }
                            }
                        }
                    }
                    if (p.componParam != null) {
                        if (p.componParam.w_bord != null && p.componParam.w_bord > 0 && p.componParam.borderColor != null) {
                            writer.write(tab + "app:riv_border_width=\"" + p.componParam.w_bord + "dp\"");
                            writer.write(tab + "app:riv_border_color=\"" + findColorByIndex(p.componParam.borderColor, parSave.colors) + "\"");
                        }
                    }
                    break;
                case Constants.TEXTVIEW:
                    if (p.componParam != null) {
                        if (p.componParam.typeValidTV != null && ! p.componParam.typeValidTV.equals("no")) {
                            writer.write(tab + "app:typeValidate=\"" + p.componParam.typeValidTV + "\"");
                            if (p.componParam.errorId != null && p.componParam.errorId.length() > 0) {
                                writer.write(tab + "app:idError=\"@id/" + p.componParam.errorId + "\"");
                            }
                            if (p.componParam.errorTxt != null && p.componParam.errorTxt.length() > 0) {
                                writer.write(tab + "app:textError=\"" + p.componParam.errorTxt + "\"");
                            }
                        }
                        if (p.componParam.acceptNotif != null && p.componParam.acceptNotif.length() > 0) {
                            writer.write(tab + "app:acceptNotif=\"" + p.componParam.acceptNotif + "\"");
                        }
                        if (p.componParam.grammar != null && p.componParam.grammar.length() > 0) {
                            String namId = p.viewId;
                            if (namId == null) {
                                namId = "";
                            }
                            String nameStrId = parSave.currentScreen + namId + "grammar";
                            formStringId(nameStrId, p.componParam.grammar, parSave.listString);
                            writer.write(tab + "app:stringArray=\"@string/" + nameStrId + "\"");
                            if (p.componParam.spaceZero != null && p.componParam.spaceZero) {
                                writer.write(tab + "app:zeroNotView=\"true\"");
                            }
                        }
                        if (p.componParam.ellipsize != null && ! p.componParam.ellipsize.equals("none")) {
                            writer.write(tab + "android:ellipsize=\"" + p.componParam.ellipsize + "\"");
                            writer.write(tab + "android:maxLines=\"1\"");
                            writer.write(tab + "android:singleLine=\"true\"");
                        } else {
                            if (p.componParam.singleLine != null && p.componParam.singleLine) {
                                writer.write(tab + "android:singleLine=\"true\"");
                            }
                            if (p.componParam.maxLine != null && p.componParam.maxLine > 0) {
                                writer.write(tab + "android:maxLines=\"" + p.componParam.maxLine + "\"");
                            }
                        }
                    }
                    break;
                case Constants.CALENDAR:
                    if (p.componParam.heightMonth != null) {
                        writer.write(tab + "app:heightMonth=\"" + p.componParam.heightMonth + "dp\"");
                    }
                    if (p.componParam.heightCell != null) {
                        writer.write(tab + "app:heightCell=\"" + p.componParam.heightCell + "dp\"");
                    }
                    if (p.componParam.monthSize != null) {
                        writer.write(tab + "app:monthSize=\"" + p.componParam.monthSize + "sp\"");
                    }
                    if (p.componParam.textDaySize != null) {
                        writer.write(tab + "app:textDaySize=\"" + p.componParam.textDaySize + "sp\"");
                    }
                    if (p.componParam.tintDiam != null) {
                        writer.write(tab + "app:selectTintDiam=\"" + p.componParam.tintDiam + "dp\"");
                    }
                    if (p.componParam.countAfterMonth != null && p.componParam.countAfterMonth > 0) {
                        writer.write(tab + "app:countAfterMonth=\"" + p.componParam.countAfterMonth + "\"");
                    }
                    if (p.componParam.countBeforeMonth != null && p.componParam.countBeforeMonth > 0) {
                        writer.write(tab + "app:countBeforeMonth=\"" + p.componParam.countBeforeMonth + "\"");
                    }
                    if (p.componParam.workDayColor != null) {
                        writer.write(tab + "app:workDayColor=\"" + findColorByIndex(p.componParam.workDayColor, parSave.colors) + "\"");
                    }
                    if (p.componParam.selectTintColor != null) {
                        writer.write(tab + "app:selectTintColor=\"" + findColorByIndex(p.componParam.selectTintColor, parSave.colors) + "\"");
                    }
                    if (p.componParam.selectTextColor != null) {
                        writer.write(tab + "app:selectTextColor=\"" + findColorByIndex(p.componParam.selectTextColor, parSave.colors) + "\"");
                    }
                    if (p.componParam.isHolidays != null && p.componParam.isHolidays) {
                        if (p.componParam.holidaysColor != null && p.componParam.holidaysColor != 6) {
                            writer.write(tab + "app:noWorkDayColor=\"" + findColorByIndex(p.componParam.holidaysColor, parSave.colors) + "\"");
                        }
                    }
                    if (p.componParam.sendNotif != null && p.componParam.sendNotif.length() > 0) {
                        writer.write(tab + "app:sendNotif=\"" + p.componParam.sendNotif + "\"");
                    }
                    if (p.componParam.dateFormat != null && p.componParam.dateFormat.length() > 0) {
                        writer.write(tab + "app:dateFormat=\"" + p.componParam.dateFormat + "\"");
                    }
                    if (p.componParam.saveParam != null && p.componParam.saveParam.length() > 0) {
                        writer.write(tab + "app:saveParam=\"" + p.componParam.saveParam + "\"");
                    }
                    if (p.componParam.rangeDate != null && p.componParam.rangeDate) {
                        writer.write(tab + "app:rangeDate=\"" + p.componParam.rangeDate + "\"");
                    }
                    if (p.componParam.afterToday != null && p.componParam.afterToday) {
                        writer.write(tab + "app:afterToday=\"" + p.componParam.afterToday + "\"");
                    }
                    if (p.componParam.tillToday != null && p.componParam.tillToday) {
                        writer.write(tab + "app:tillToday=\"" + p.componParam.tillToday + "\"");
                    }
                    if (p.componParam.nameMonth != null && p.componParam.nameMonth.length() > 0) {
                        String namId = p.viewId;
                        if (namId == null) {
                            namId = "";
                        }
                        String nameStrId = parSave.currentScreen + namId + "calendar";
                        formStringId(nameStrId, p.componParam.nameMonth, parSave.listString);
                        writer.write(tab + "app:nameMonth=\"@string/" + nameStrId + "\"");
                    }
                    break;
                case Constants.SEEKBAR:
                    SeekBarParam sbp = p.seekBarParam;
                    if (sbp != null) {
                        if (sbp.barHeight != null) {
                            writer.write(tab + "app:barHeight=\"" + sbp.barHeight + "dp\"");
                        }
                        if (sbp.betweenColor != null) {
                            writer.write(tab + "app:betweenColor=\"" + findColorByIndex(sbp.betweenColor, parSave.colors) + "\"");
                        }
                        if (sbp.tumbColor != null) {
                            if (sbp.tumbColor == 100000) {
                                writer.write(tab + "app:thumbImg=\"@drawable/" + nameFromUrl(p.src) + "\"");
                            } else {
                                writer.write(tab + "app:thumbColor=\"" + findColorByIndex(sbp.tumbColor, parSave.colors) + "\"");
                            }
                        }
                        if (sbp.range != null && ! sbp.range) {
                            writer.write(tab + "app:singleThumb=\"true\"");
                        }
                        if (p.componParam.background != null && p.componParam.background > 999) {
                            writer.write(tab + "app:barDrawable=\"@drawable/shape_" + p.componParam.background + "\"");
                        } else {
                            writer.write(tab + "app:barColor=\"" + findColorByIndex(p.componParam.background, parSave.colors) + "\"");
                        }
                        writer.write(tab + "app:minValueSeek=\"" + sbp.minV + "\"");
                        writer.write(tab + "app:maxValueSeek=\"" + sbp.maxV + "\"");
                        writer.write(tab + "app:minStartValue=\"" + sbp.minInit + "\"");
                        writer.write(tab + "app:maxStartValue=\"" + sbp.maxInit + "\"");
                        if (sbp.sliderId != null) {
                            writer.write(tab + "app:sliderViewInfo=\"@id/" + sbp.sliderId + "\"");
                        }
                        if (sbp.sendNotif != null && sbp.sendNotif.length() > 0) {
                            writer.write(tab + "app:sendNotif=\"" + sbp.sendNotif + "\"");
                        }
                    }
                    break;
                case Constants.TAB:
                    TabLayout tl = p.tabLayout;
                    if (tl.indColor != null) {
                        writer.write(tab + "app:tabIndicatorColor=\"" + findColorByIndex(tl.indColor, parSave.colors) + "\"");
                    }
                    if (tl.indHeight != null) {
                        writer.write(tab + "app:tabIndicatorHeight=\"" + tl.indHeight + "dp\"");
                    }
                    if (tl.textSelect != null) {
                        writer.write(tab + "app:tabSelectedTextColor=\"" + findColorByIndex(tl.textSelect, parSave.colors) + "\"");
                    }
                    if (tl.textColor != null) {
                        writer.write(tab + "app:tabTextColor=\"" + findColorByIndex(tl.textColor, parSave.colors) + "\"");
                    }
                    break;
                case Constants.GALLERY:
                    if (p.componParam != null) {
                        if (p.componParam.bindEl != null) {
                            writer.write(tab + "app:indicator=\"@id/" + p.componParam.bindEl + "\"");
                        }
                    }
                    break;
                case Constants.INDICATOR:
                    if (p.componParam != null) {
                        if (p.componParam.diam != null) {
                            writer.write(tab + "app:diametrItem=\"" + p.componParam.diam + "dp\"");
                        }
                        if (p.componParam.colorNorm != null) {
                            writer.write(tab + "app:colorNorm=\"" + findColorByIndex(p.componParam.colorNorm, parSave.colors) + "\"");
                        }
                        if (p.componParam.colorSel != null) {
                            writer.write(tab + "app:colorSelect=\"" + findColorByIndex(p.componParam.colorSel, parSave.colors) + "\"");
                        }
                    }
                    break;
                case Constants.ELLIPSIS:
                    if (p.componParam != null) {
                        if (p.componParam.orient != null && p.componParam.orient.equals("vertical")) {
                            writer.write(tab + "android:orientation=\"vertical\"");
                        }
                        if (p.componParam.diam != null) {
                            writer.write(tab + "app:diametrDot=\"" + p.componParam.diam + "dp\"");
                        }
                        if (p.componParam.colorNorm != null) {
                            writer.write(tab + "app:colorDot=\"" + findColorByIndex(p.componParam.colorNorm, parSave.colors) + "\"");
                        }
                        if (p.componParam.amountDots != null) {
                            writer.write(tab + "app:amountDots=\"" + p.componParam.amountDots + "\"");
                        }
                    }
                    break;
                case Constants.RATINGS:
                    if (p.componParam != null) {
                        if (p.componParam.diam != null) {
                            writer.write(tab + "app:widthStar=\"" + p.componParam.diam + "dp\"");
                        }
                        if (p.componParam.srcContour != null) {
                            writer.write(tab + "app:star=\"@drawable/" + nameFromUrl(p.componParam.srcContour) + "\"");
                        }
                        if (p.componParam.srcFilled != null) {
                            writer.write(tab + "app:starFilled=\"@drawable/" + nameFromUrl(p.componParam.srcFilled) + "\"");
                        }
                        if (p.componParam.amountDots != null) {
                            writer.write(tab + "app:amountStars=\"" + p.componParam.amountDots + "\"");
                        }
                    }
                    break;
                case Constants.MAP:
                    writer.write(tab + "class=\"com.google.android.gms.maps.SupportMapFragment\"");
                    break;
                case Constants.SHEET:
                    if (p.children != null && p.children.size() > 0) {
                        AndroidPar ap = p.children.get(0);
                        if (ap != null && ap.height == Constants.MATCH) {
                            writer.write(tab + "app:viewMatch=\"true\"");
                        }
                    }
                    if (p.sheetParam != null) {
                        if (p.componParam.bool_1) {
                            writer.write(tab + "app:noSwipeHide=\"true\"");
                        }
                        if (p.componParam.bool_2) {
                            writer.write(tab + "app:noBackPressedHide=\"true\"");
                        }
                        if (p.componParam.color_1 != null && p.componParam.color_1 != 17) {
                            writer.write(tab + "app:fadedScreenColor=\"" + findColorByIndex(p.componParam.color_1, parSave.colors) + "\"");
                        }
                    }
/*
                    if (p.sheetParam != null) {
                        if (p.sheetParam.noSwipe) {
                            writer.write(tab + "app:noSwipeHide=\"true\"");
                        }
                        if (p.sheetParam.noBP) {
                            writer.write(tab + "app:noBackPressedHide=\"true\"");
                        }
                    }
*/
                    writer.write(tab + "app:viewId=\"@layout/view_" + parSave.currentScreen.toLowerCase() + "_" + p.viewId + "\"");
                    break;
                case Constants.MENU_B:
                    ColorSet cs = p.colorSet;
                    if (cs.textColor != 3) {
                        writer.write(tab + "app:normColor=\"" + findColorByIndex(cs.textColor, parSave.colors) + "\"");
                    }
                    writer.write(tab + "app:selectColor=\"" + findColorByIndex(cs.textSelect, parSave.colors) + "\"");
                    if ( ! cs.toAnimate) {
                        writer.write(tab + "app:toAnimate=\"false\"");
                    }
                    if ( ! cs.changeColor) {
                        writer.write(tab + "app:noSelImgChangeColor=\"true\"");
                    }
                    if (cs.location != null && ( ! cs.location.equals("top"))) {
                        writer.write(tab + "app:imageLocale=\"" + cs.location + "\"");
                    }
                    if (cs.background != null && cs.background.length() > 0) {
                        writer.write(tab + "app:selectBackground=\"@drawable/shape_" + cs.background + "\"");
                    }
                    break;
                case Constants.MENU:
                    if (p.componParam != null) {
                        if (p.componParam.colorNorm != 0) {
                            writer.write(tab + "app:normColor=\"" + findColorByIndex(p.componParam.colorNorm, parSave.colors) + "\"");
                        }
                        if (p.componParam.colorSel != 1) {
                            writer.write(tab + "app:selectColor=\"" + findColorByIndex(p.componParam.colorSel, parSave.colors) + "\"");
                        }
                        if (p.componParam.colorEnab != 7) {
                            writer.write(tab + "app:enablColor=\"" + findColorByIndex(p.componParam.colorEnab, parSave.colors) + "\"");
                        }
                        if (p.componParam.colorBadge != 3) {
                            writer.write(tab + "app:badgeColor=\"" + findColorByIndex(p.componParam.colorBadge, parSave.colors) + "\"");
                        }
                        if (p.componParam.colorDivider != 7) {
                            writer.write(tab + "app:dividerColor=\"" + findColorByIndex(p.componParam.colorDivider, parSave.colors) + "\"");
                        }
                    }
                    break;
                case Constants.CARD_VIEW:
                    if (p.radiusCard > 0) {
                        writer.write(tab + "app:cardCornerRadius=\"" + p.radiusCard + "dp\"");
                    }
                    if (p.elevCardShadow != null && p.elevCardShadow.length() > 0) {
                        writer.write(tab + "app:cardElevation=\"" + Integer.valueOf(p.elevCardShadow) + "dp\"");
                    }
                    break;
                case Constants.PLUS_MINUS:
                    if (p.componParam != null) {
                        if (p.componParam.noEdit != null && p.componParam.noEdit) {
                            writer.write(tab + "app:noEdit=\"true\"");
                        }
                        if (p.componParam.maxV != null) {
                            writer.write(tab + "app:maxValue=\"" + p.componParam.maxV + "\"");
                        }
                        if (p.componParam.minV != null) {
                            writer.write(tab + "app:minValue=\"" + p.componParam.minV + "\"");
                        }
/*
                        if (p.componParam.minusId != null && p.componParam.minusId.length() > 0) {
                            writer.write(tab + "app:minusViewId=\"@id/" + p.componParam.minusId + "\"");
                        }
                        if (p.componParam.plusId != null && p.componParam.plusId.length() > 0) {
                            writer.write(tab + "app:plusViewId=\"@id/" + p.componParam.plusId + "\"");
                        }
*/
                        if (p.componParam.resultId != null && p.componParam.resultId.length() > 0) {
                            writer.write(tab + "app:viewMirror=\"@id/" + p.componParam.resultId + "\"");
                        }
                    }
                    break;
            }
            if (p.componParam != null) {
                if (p.componParam.formatTime != null) {
                    writer.write(tab + "app:dateFormat=\"" + p.componParam.formatTime + "\"");
                }
                if (p.componParam.formatNum != null) {
                    writer.write(tab + "app:numberFormat=\"" + p.componParam.formatNum + "\"");
                }
            }
        } catch (IOException ex) {
            System.out.println("ExportResult createOneElement error=" + ex);
        }
        return typeEl;
    }

    private String dimens(int d) {
        for (int i : Constants.standartDimens) {
            if (d == i) {
                return "@dimen/dim_" + d;
            }
        }
        return d + "dp";
    }
    
    private String dimens(String d) {
        return dimens(Integer.valueOf(d));
    }
    

    private String findColorByIndex(int colorInd, ListItemResurces colors) {
        for (ItemResurces ir : colors) {
            if (ir.itemId == colorInd) {
                if (ir.itemName != null && ir.itemName.length() > 0) {
                    return "@color/" + ir.itemName;
                } else {
                    return colorAndroid(ir.itemValue);
                }
            }
        }
        return "";
    }
    
    private String findColorResourse(int colorInd, ListItemResurces colors) {
        for (ItemResurces ir : colors) {
            if (ir.itemId == colorInd) {
                if (ir.itemName != null && ir.itemName.length() > 0) {
                    return "R.color." + ir.itemName;
                } else {
                    return ir.itemValue;
                }
            }
        }
        return "";
    }
    
    private String findDrawableByIndex(int ind, ListItemResurces drawable) {
        for (ItemResurces ir : drawable) {
            if (ir.itemId == ind) {
                return ir.itemName;
            }
        }
        return "";
    }

    private void createValue(String resPath, ParamSave parSave) {
        String path = resPath + "/values";
        formDir(path);
        createColors(path, parSave);
        createDimens(path);
        createStrings(path, parSave);
        createStyles(path, parSave);
    }
    
    public void setManifestAndroid(String pathIn, String pathOut, ItemChange[] arCh, ParamSave parSave) {
        try {
            FileReader reader = new FileReader(pathIn);
            FileWriter writer = new FileWriter(pathOut, false);
            Scanner scan = new Scanner(reader);
            while (scan.hasNextLine()) {
                String line = scan.nextLine();
                int i = line.indexOf("#");
                if (i < 0) {
                    writer.write(line + "\n");
                } else {
                    int i1 = line.indexOf("#", i + 1);
                    String par = line.substring(i, i1 + 1);
                    switch (par) {
                        case "#add_app#":
                            for (String st : parSave.addApp) {
                                writer.write(st);
                            }
                            writer.write("\n");
                            break;
                        case "#add_permish#":
                            for (String st : parSave.addPermish) {
                                writer.write("\n" + tab4 + st);
                            }
                            writer.write("\n");
                            break;
                        default:
                            for (ItemChange ic : arCh) {
                                if (ic.name.equals(par)) {
                                    writer.write(line.replace(ic.name, ic.value) + "\n");
                                    break;
                                }
                            }
                    }

                }
            }
            writer.flush();
            writer.close();
            reader.close();
        } catch (IOException ex) {
            Logger.getLogger(BaseServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void createColors(String path, ParamSave parSave) {
        if (parSave.colors != null && parSave.colors.size() > 0) {
            try {
                FileWriter writer = new FileWriter(path + "/colors.xml", false);
                writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
                writer.write("<resources>\n");
                for (ItemResurces ir : parSave.colors) {
                    if (ir.itemName != null && ir.itemName.length() > 0) {
                        writer.write("    <color name=\"" + ir.itemName + "\">" + colorAndroid(ir.itemValue) + "</color>\n");
                    }
                }
                writer.write("</resources>");
                writer.flush();
            } catch (IOException ex) {
                System.out.println("ExportResult createColors error=" + ex);
            }
        }
    }
    
    private String colorAndroid(String js) {
        String col = js;
        String colIt = col;
        if (col.length() == 5) {
            colIt = "#" + col.substring(4) + col.substring(1, 4);
        } else {
            if (col.length() == 9) {
                String alf = col.substring(7);
                if ("ff".equals(alf)) {
                    colIt = "#" + col.substring(1, 7);
                } else {
                    colIt = "#" + col.substring(7) + col.substring(1, 7);
                }
            }
        }
        return colIt;
    }
    
    private void createStyles(String path, ParamSave parSave) {
        try {
            FileWriter writer = new FileWriter(path + "/styles.xml", false);
            writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
            writer.write("<resources>\n");
            if (parSave.styles != null && parSave.styles.size() > 0) {
                for (ItemStyle is : parSave.styles) {
                    if (is.listItem.size() > 0);
                    ItemResurces ir1 = is.listItem.get(0);
                    String par = "";
                    if (ir1.itemName.equals("parent")) {
                        par = " parent=\"" + ir1.itemValue + "\"";
                    }
                    writer.write("<style name=\"" + is.styleName + "\"" + par + ">\n");
                    for (ItemResurces ir : is.listItem) {
                        if ( ! ir.itemName.equals("parent")) {
                            writer.write("    <item name=\"" + ir.itemName + "\">" + ir.itemValue + "</item>\n");
                        }
                    }
                    writer.write("    </style>\n");
                }
            }
            writer.write("</resources>");
            writer.flush();
            writer.close();
        } catch (IOException ex) {
            System.out.println("ExportResult createDimens error=" + ex);
        }
    }
    
    private void createStrings(String path, ParamSave parSave) {
        try {
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream(path + "/strings.xml"), "UTF8"));
            writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
            writer.write("<resources>\n");
            if (parSave.strings != null && parSave.strings.size() > 0) {
                for (ItemResurces ir : parSave.strings) {
                    if (ir.itemName != null && ir.itemName.length() > 0) {
                        writer.write("    <string name=\"" + ir.itemName + "\">" + ir.itemValue + "</string>\n");
                    }
                }
            }
            List<ItemResurces> listString = parSave.getListString();
            if (listString.size() > 0) {
                int sk = listString.size();
                if (sk > 0) {
                    for (int s = 0; s < sk; s++) {
                        ItemResurces ir = listString.get(s);
                        writer.write("    <string name=\"" + ir.itemName + "\">" + ir.itemValue + "</string>\n");
                    }
                }
            }
            if (parSave.arrayString != null  && parSave.arrayString.size() > 0) {
                for (String st : parSave.arrayString) {
                     writer.write(st);
                }
            }
            writer.write("</resources>");
            writer.flush();
        } catch (IOException ex) {
            System.out.println("ExportResult createDimens error=" + ex);
        }
    }
    
    private void createDimens(String path) {
        try {
            FileWriter writer = new FileWriter(path + "/dimens.xml", false);
            writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
            writer.write("<resources>\n");
            for (int ir : Constants.standartDimens) {
                writer.write("    <dimen name=\"dim_" + ir + "\">" + ir + "dp</dimen>\n");
            }
            writer.write("</resources>");
            writer.flush();
        } catch (IOException ex) {
            System.out.println("ExportResult createDimens error=" + ex);
        }
    }
    
    
    private void createDrawable(String resPath, ParamSave parSave) {
        String path = resPath + "/drawable";
//        formDir(path);
        if (parSave.drawable != null && parSave.drawable.size() > 0) {
            for (ItemResurces ir : parSave.drawable) {
                createOneDrawable(path, ir, parSave.colors);
            }
        }
    }
    
    private void createOneDrawable(String path, ItemResurces ir, ListItemResurces colors) {
        Drawable drawable = gson.fromJson(ir.itemValue, Drawable.class);
        String b4 = "\n    ";
        if (drawable.type == null) drawable.type = "rectangle";
        try {
            FileWriter writer = new FileWriter(path + "/" + ir.itemName + ".xml", false);
            writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
            writer.write("<shape");
            writer.write(b4 + "xmlns:android=\"http://schemas.android.com/apk/res/android\"");
            writer.write(b4 + "android:shape=\"" + drawable.type +"\">");
            if (drawable.gradient == 0) {
                writer.write(b4 + "<solid android:color=\"" + findColorByIndex(drawable.color_1, colors) + "\"/>");
            } else {
                writer.write(b4 + "<gradient android:angle=\"" + Constants.ANGLES[drawable.gradient] 
                        + "\" android:startColor=\"" + findColorByIndex(drawable.color_1, colors)
                        + "\" android:endColor=\"" + findColorByIndex(drawable.color_2, colors) + "\"/>");
            }
            if (drawable.border != null && drawable.border > 0) {
                if (drawable.borderStyle.equals("solid")) {
                    writer.write(b4 + "<stroke android:width=\"" + dimens(drawable.border) 
                            + "\" android:color=\"" + findColorByIndex(drawable.bordedColor, colors) + "\"/>");
                } else {
                    writer.write(b4 + "<stroke android:width=\"" + dimens(drawable.border) 
                            + "\" android:dashWidth=\"20dp\" android:dashGap=\"3dp\""
                            + " android:color=\"" + findColorByIndex(drawable.bordedColor, colors) + "\"/>");
                }
            }
            boolean corn = false;
            int lt = 0;
            if (drawable.corners.lt != null && drawable.corners.lt.length() > 0) {
                lt = Integer.valueOf(drawable.corners.lt);
                if (lt > 0) corn = true;
            }
            int tr = 0;
            if (drawable.corners.tr != null && drawable.corners.tr.length() > 0) {
                tr = Integer.valueOf(drawable.corners.tr);
                if (tr > 0) corn = true;
            }
            int rb = 0;
            if (drawable.corners.rb != null && drawable.corners.rb.length() > 0) {
                rb = Integer.valueOf(drawable.corners.rb);
                if (rb > 0) corn = true;
            }
            int bl = 0;
            if (drawable.corners.bl != null && drawable.corners.bl.length() > 0) {
                bl = Integer.valueOf(drawable.corners.bl);
                if (bl > 0) corn = true;
            }
            if (corn) {
                if (lt == tr && tr == rb && rb == bl) {
                    writer.write(b4 + "<corners android:radius=\"" + dimens(drawable.corners.bl) + "\"/>");
                } else {
                    writer.write(b4 + "<corners");
                    String b8 = b4 + "    ";
                    if (lt > 0) {
                        writer.write(b8 + "android:topLeftRadius=\"" + dimens(drawable.corners.lt) + "\"");
                    }
                    if (tr > 0) {
                        writer.write(b8 + "android:topRightRadius=\"" + dimens(drawable.corners.tr) + "\"");
                    }
                    if (rb > 0) {
                        writer.write(b8 + "android:bottomRightRadius=\"" + dimens(drawable.corners.rb) + "\"");
                    }
                    if (bl > 0) {
                        writer.write(b8 + "android:bottomLeftRadius=\"" + dimens(drawable.corners.bl) + "\"");
                    }
                    writer.write(b8 + ">\n    </corners>");
                }
            }
            writer.write("\n</shape>");
            writer.flush();
        } catch (IOException ex) {
            System.out.println("ExportResult createColors error=" + ex);
        }
    }

    private void zipRes(String zip, String folder, int lengthBase) {
        try {
            zipFolder(zip, folder, lengthBase);
        } catch (Exception ex) {
            System.out.println("ExportResult android error="+ex);
        }
    }
    
    private void zipFolder(String arhive, String folder, int lengthBase) throws Exception {
        ZipOutputStream out = new ZipOutputStream(new FileOutputStream(arhive));
        File file = new File(folder);
        doZip(file, out, lengthBase);
        out.close();
    }
    
    private void doZip(File dir, ZipOutputStream out, int lengthBase) throws IOException {
        for (File f : dir.listFiles()) {
            if (f.isDirectory())
                doZip(f, out, lengthBase);
            else {
                out.putNextEntry(new ZipEntry(f.getPath().substring(lengthBase)));
                writeToZip(new FileInputStream(f), out);
            }
        }
    }

}
