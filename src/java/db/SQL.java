package db;

public class SQL {
    public static String getLogin = "SELECT * FROM users WHERE login=";
    public static String getLoginById = "SELECT * FROM users WHERE user_id=";
    public static String getUserToken = "SELECT * FROM token_user WHERE token=";
//    public static String getUserToken = "SELECT * FROM users WHERE user_id = SELECT user_id FROM token_user WHERE token=";
    public static String getScreen = "SELECT * FROM screens WHERE screen_id=";
    public static String getProject = "SELECT project_name, project_id, app_name, package, project_comment, logo, host, date_create, image FROM projects WHERE user_id=";
    public static String getProjectById = "SELECT * FROM projects WHERE project_id=";
    public static String getParam = "SELECT * FROM app_param ORDER BY id";
    public static String getScreenList = "SELECT screen_name, screen_id, screen_comment FROM screens WHERE project_id=";
    public static String getScreenListForExport = "SELECT screen_name, screen_id, screen_comment, layout FROM screens WHERE project_id=";
    public static String getScreenById = "SELECT * FROM screens WHERE screen_id=";
    
    public static String getListTab = "SELECT * FROM tables_descr WHERE id_project=";
    
}
