package servlets;

public class Constants {
//    public final static boolean isLocale = false;
//    public static String NAME_IDE = "depro-ide";
    public static String NAME_IDE = "DeProIDE";
    
    public static String BaseURL;
    public static String BASEPATH = "/usr/local/";
    public static int MATCH = -1, WRAP = -2;
    public static int[] standartDimens = {2, 4, 8, 12, 14, 16, 18, 20, 24, 28, 32, 40, 56};
    public static final int TOP = 0, CENTER = 1, BOTTOM = 2, ABSOLUTE = 3, NONE = 4;
    public static final int LEFT = 0, RIGHT = 2;
    public static int[] ANGLES = {0, 90, 45, 0, 315};
    public static String prefixProfileParam = "!!__!!";
    public final static int GET = 0, POST = 1, FILTER = 2, TEST = 3, JSON = 4, PARAMETERS = 5, GLOBAL = 6, ARGUMENTS = 7, PROFILE = 8, FIELD = 9, 
            GET_DB = 10, POST_DB = 11, INSERT_DB = 12, DEL_DB = 13, UPDATE_DB = 14, NULL = 15;
    
    public static String PROJECTS_DATA = "projectdataIDE/", 
            USERS_DATA = "usersdataIDE/";
    public static final String TOOL = "ToolBar", PANEL = "Panel", SCROLLPANEL = "ScrollView", SCROLLFORM = "ScrollForm", FORM = "Form", ELLIPSIS = "Ellipsis",
            LIST = "List", PAGER = "Pager", TAB = "TabLayout", DRAWER = "Drawer", SCROLL = "ScrollPanel", SCROLL_F = "ScrollForm", CARD_VIEW = "CardView",
            MENU_B = "MenuBottom", MENU = "Menu", GALLERY = "Gallery", INDICATOR = "Indicator", IMAGEVIEW = "ImageView", TOOL_MENU = "ToolMenu",
            PLUS_MINUS = "PlusMinus", RATINGS = "Ratings", SWITCH = "Switch", CHECKBOX = "CheckBox", TOTAL = "Total", PHOTO = "Photo",
            MAP = "Map", SHEET = "SheetBottom", TEXTVIEW = "TextView", EDITTEXT = "EditText", CALENDAR = "Calendar", SEEKBAR = "SeekBar", 
            TAGS = "Tags", SPINNER = "Spinner", SEQUENCE = "ScreenSequence", INTRO = "Intro", EDIT_GALLERY = "EditGallery", SWIPE_LAYOUT = "SwipeLayout", 
            SWIPE = "Swipe", SUBSCRIBE_FIREBASE = "SubscribeFirebase";
    public static String txtInp = "_txt_inp_";
    public static String importMenu = "import com.dpcsa.compon.interfaces_classes.Menu;\n";
    public static String importToolMenu = "import com.dpcsa.compon.interfaces_classes.ToolBarMenu;\n";
    public static String importParamMap = "import com.dpcsa.compon.param.ParamMap;\n";
    public static String importMultiply = "import com.dpcsa.compon.interfaces_classes.Multiply;\n";
    public static String importViewHandler = "import com.dpcsa.compon.interfaces_classes.ViewHandler;\n";
    public static String importance = "import static android.app.NotificationManager.IMPORTANCE_";
    
    public static String[] animate = {"No", "LR", "RL", "BT", "TB"};
    public static String[] scaleType = {"centerCrop", "center"};
    public static String roundedType = "com.makeramen.roundedimageview.RoundedImageView";
    public static String componImage = "com.dpcsa.compon.custom_components.ComponImageView";
    public static String cardViewType = "androidx.cardview.widget.CardView";
    public static String TextValid = "com.dpcsa.compon.custom_components.ComponTextValid";
    public static String TextCompon = "com.dpcsa.compon.custom_components.ComponTextView";
    public static String TextGrammar = "com.dpcsa.compon.custom_components.TextViewNumberGrammar";
    public static String EditCompon = "com.dpcsa.compon.custom_components.ComponEditText";
    public static String EditMask = "com.dpcsa.compon.custom_components.EditTextMask";
    public static String InputLayout = "com.google.android.material.textfield.TextInputLayout";
    public static String[] componType = {
        "androidx.appcompat.widget.Toolbar", // 0
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
        "RelativeLayout",                                                // 23   TOTAL
        "com.dpcsa.compon.custom_components.ComponSpinner",            // 24
        "androidx.viewpager.widget.ViewPager",                      // 25    INTRO
        "com.dpcsa.compon.custom_components.SwipeLayout",            // 26 
    };
    
    public static String textMail = "<!DOCTYPE html><html><head><title>TODO supply a title</title><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" 
            + "</head><body>"
            +"<div style='width:500px;font-size:14px;text-align:center'>"
            +"<img width='50' height='50' src='https://ide.dp-ide.com/img/logo_blue.png' style='display:inline-block'>"
            +"<div>Helo ";
    public static String textMail_1 = "!</div><div>Confirmation code to enter the site DePro</div>"
            +"<div style='width:300px;height:80px;background-color:#e0f0ff;margin-top:24px;display:inline-block;text-align:center;'>" 
            + "<div style='font-size:28px;margin-top:5px;'>";
    public static String textMail_2 = "</div><div style='margin-top:5px;color:red'>Your code will expire after 10 minutes</div></div></div></body></html>";
}

