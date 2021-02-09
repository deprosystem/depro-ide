package servlets;

public class Constants {
//    public final static boolean isLocale = false;
    public static String NAME_IDE = "depro-ide";
    public static String BaseURL;
    public static int MATCH = -1, WRAP = -2;
    public static int[] standartDimens = {2, 4, 8, 12, 14, 16, 18, 20, 24, 28, 32, 40, 56};
    public static final int TOP = 0, CENTER = 1, BOTTOM = 2, ABSOLUTE = 3, NONE = 4;
    public static final int LEFT = 0, RIGHT = 2;
    public static int[] ANGLES = {0, 90, 45, 0, 315};
    public final static int GET = 0, POST = 1, TEST = 2, PARAMETERS = 5;
    
    public static String PROJECTS_DATA = "projectdataIDE/", 
            USERS_DATA = "usersdataIDE/";
    public static final String TOOL = "ToolBar", PANEL = "Panel", SCROLLPANEL = "ScrollView",
            LIST = "List", PAGER = "Pager", TAB = "TabLayout", DRAWER = "Drawer", SCROLL = "ScrollPanel",
            MENU_B = "MenuBottom", MENU = "Menu", GALLERY = "Gallery", INDICATOR = "Indicator", IMAGEVIEW = "ImageView",
            MAP = "Map", SHEET = "SheetBottom";
/*
    public static String toolCompon = "com.dpcsa.compon.custom_components.ComponToolBar",
            listCompon = "androidx.recyclerview.widget.RecyclerView",
            menu_bCompon = "com.dpcsa.compon.custom_components.ComponMenuB";
*/
    public static String importMenu = "import com.dpcsa.compon.interfaces_classes.Menu;\n";
    public static String importParamMap = "import com.dpcsa.compon.param.ParamMap;\n";
    public static String[] animate = {"No", "LR", "RL", "BT", "TB"};
    public static String[] scaleType = {"centerCrop", "center"};
    public static String roundedType = "com.makeramen.roundedimageview.RoundedImageView";
    public static String[] componType = {
        "com.dpcsa.compon.custom_components.ComponToolBar", // 0
        "com.dpcsa.compon.custom_components.ComponMenuB", // 1
        "androidx.recyclerview.widget.RecyclerView", // 2
        "com.dpcsa.compon.custom_components.ComponTextView", // 3
        "androidx.viewpager.widget.ViewPager",  // 4
        "com.google.android.material.tabs.TabLayout",   // 5
        "androidx.drawerlayout.widget.DrawerLayout",   // 6
        "RelativeLayout",                               // 7
        "com.dpcsa.compon.custom_components.Gallery",       // 8
        "ScrollView",                                       // 9
        "com.dpcsa.compon.custom_components.PagerIndicator",       // 10
        "com.dpcsa.compon.custom_components.ComponMapView",          // 11
        "com.dpcsa.compon.custom_components.SheetBottom"            // 12
    };

}
