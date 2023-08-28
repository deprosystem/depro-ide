package entity;

import android.ListSwitchParam;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import projects.ItemResurces;
import projects.ItemStyle;

public class ParamSave {
    public String nameAPP, nameScreenStart, nameClassStart, realPath, resPath;
    public String currentScreen, path, schema, basePath, userProjPath;
    public String toolId, menuId, scrollId;
    public String pathLayoutItem;
    public boolean noToolMenu, noDrawer, noFragmContainer, isCamera, havePush;
    public Screen currentScreenObj;
    public int typeScreen;
    public List<String> arrayString;
    public List<String> addApp;
    public Set<String> addPermish, styleTxtInpt;
    public List<ItemResurces> listString;
    public ListScreen sreens;
    public ListItemResurces colors, drawable, strings;
    public List<ItemStyle> styles;
    public ListSwitchParam switchSpec, styleCheck;
    public HashSet<String> importD, plaginGradle, addImplement, addClassPath;
    
    public List<ItemResurces> getListString() {
        if (listString == null) {
            listString = new ArrayList();
        }
        return listString;
    }
}
