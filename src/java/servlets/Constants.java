package servlets;

public class Constants {
//    public final static boolean isLocale = false;
//    public static String NAME_IDE = "depro-ide";
    public static String NAME_IDE = "DeProIDE";
    
    public static String BaseURL;
    public static int MATCH = -1, WRAP = -2;
    public static int[] standartDimens = {2, 4, 8, 12, 14, 16, 18, 20, 24, 28, 32, 40, 56};
    public static final int TOP = 0, CENTER = 1, BOTTOM = 2, ABSOLUTE = 3, NONE = 4;
    public static final int LEFT = 0, RIGHT = 2;
    public static int[] ANGLES = {0, 90, 45, 0, 315};
    public final static int GET = 0, POST = 1, TEST = 2, JASON = 3, PARAMETERS = 4, GLOBAL = 5, ARGUMENTS = 6, PROFILE = 7, FIELD = 8, 
            GET_DB = 9, POST_DB = 10, INSERT_DB = 11, DEL_DB = 12, UPDATE_DB = 13, NULL = 14;
    
    public static String PROJECTS_DATA = "projectdataIDE/", 
            USERS_DATA = "usersdataIDE/";
    public static final String TOOL = "ToolBar", PANEL = "Panel", SCROLLPANEL = "ScrollView", FORM = "Form", ELLIPSIS = "Ellipsis",
            LIST = "List", PAGER = "Pager", TAB = "TabLayout", DRAWER = "Drawer", SCROLL = "ScrollPanel", CARD_VIEW = "CardView",
            MENU_B = "MenuBottom", MENU = "Menu", GALLERY = "Gallery", INDICATOR = "Indicator", IMAGEVIEW = "ImageView",
            PLUS_MINUS = "PlusMinus", RATINGS = "Ratings", SWITCH = "Switch", CHECKBOX = "CheckBox",
            MAP = "Map", SHEET = "SheetBottom", TEXTVIEW = "TextView", CALENDAR = "Calendar", SEEKBAR = "SeekBar", TAGS = "Tags";
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
    public static String cardViewType = "androidx.cardview.widget.CardView";
    public static String TextValid = "com.dpcsa.compon.custom_components.ComponTextValid";
    public static String TextCompon = "com.dpcsa.compon.custom_components.ComponTextView";
    public static String TextGrammar = "com.dpcsa.compon.custom_components.TextViewNumberGrammar";
    public static String[] componType = {
        "com.dpcsa.compon.custom_components.ComponToolBar", // 0
        "com.dpcsa.compon.custom_components.ComponMenuB", // 1
        "androidx.recyclerview.widget.RecyclerView", // 2
        "com.dpcsa.compon.custom_components.ComponTextView", // 3
        "com.dpcsa.compon.custom_components.ComponViewPager",  // 4
        "com.google.android.material.tabs.TabLayout",   // 5
        "androidx.drawerlayout.widget.DrawerLayout",   // 6
        "RelativeLayout",                               // 7
        "com.dpcsa.compon.custom_components.Gallery",       // 8
        "ScrollView",                                       // 9
        "com.dpcsa.compon.custom_components.PagerIndicator",       // 10
        "com.dpcsa.compon.custom_components.ComponMapView",          // 11
        "com.dpcsa.compon.custom_components.SheetBottom",            // 12
        "androidx.cardview.widget.CardView",                         // 13
        "com.dpcsa.compon.custom_components.Ellipsis",               // 14
        "com.dpcsa.compon.custom_components.CalendarVertical",        // 15
        "com.dpcsa.compon.custom_components.SeekBarRange",            // 16
        "com.dpcsa.compon.custom_components.TagsView",            // 17
        "com.dpcsa.compon.custom_components.PlusMinus",            // 18
        "com.dpcsa.compon.custom_components.Ratings",            // 19
        "com.dpcsa.compon.custom_components.ElementMenu",            // 20
        "com.dpcsa.compon.custom_components.ComponSwitch",            // 21
        "com.dpcsa.compon.custom_components.ComponCheckBox",            // 22
        "RelativeLayout"                                                // 23
    };

}
