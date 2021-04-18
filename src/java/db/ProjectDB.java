package db;

import projects.ProjectM;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;

public class ProjectDB extends BaseDB {

    public ProjectDB(HttpServletRequest request) {
        super(request);
    }
    
    public long createProjectId(ProjectM pc) {
        long res = -1;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            String str = "INSERT INTO projects (user_id, project_name, package, project_comment, app_name, resurse_ind, strings, app_param, color, style, drawable, dimens, screens, date_create) VALUES ("
                    + pc.userId + ",'" + pc.nameProject + "','" + pc.namePackage + "','" + pc.comment + "','" + pc.nameAPP + "','" + pc.resurseInd + "','" + pc.strings + "','" + pc.appParam + "','" + pc.colors + "','" 
                    + pc.style + "','" + pc.drawable + "','" + pc.dimens + "','" + pc.screens + "'," + pc.dateCreate + ");";
            int updateCount = statement.executeUpdate(str, Statement.RETURN_GENERATED_KEYS);
            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
              if (generatedKeys.next()) {
                res = generatedKeys.getLong("project_id");
              }
              else {
                  System.out.println("createProjektId Creating failed, no ID obtained.");
              }
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("createProjektId error="+ex);
        }
        return res;
    }

    public void updateProject(ProjectM pc) {
        String strUpd = "UPDATE projects SET ";
        String sep = "";
        if (pc.colors != null && pc.colors.length() > 0) {
            strUpd += "color = " + " '" + pc.colors + "' ";
            sep = ",";
        }
        if (pc.drawable != null) {
            strUpd += sep + "drawable = " + " '" + pc.drawable + "' ";
            sep = ",";
        }
        if (pc.appParam != null) {
            strUpd += sep + "app_param = " + " '" + pc.appParam + "' ";
            sep = ",";
        }
        if (pc.style != null) {
            strUpd += sep + "style = " + " '" + pc.style + "' ";
            sep = ",";
        }
        if (pc.screens != null) {
            strUpd += sep + "screens = " + " '" + pc.screens + "' ";
            sep = ",";
        }
        strUpd += " WHERE project_id = " + pc.projectId;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate(strUpd);
        } catch (SQLException ex) {
            System.out.println("updateProject error="+ex);
        } catch (ClassNotFoundException ex) {
            System.out.println("updateProject error="+ex);
        }
    }
    
    public void changeProject(ProjectM pc, String projectId) {
        String strUpd = "UPDATE projects SET ";
        strUpd += "project_name ='" + pc.nameProject +  "', package='" + pc.namePackage +  "', project_comment='" + pc.comment + "', app_name ='" + pc.nameAPP 
                + "', logo ='" + pc.logo + "', image ='" + pc.image + "' WHERE project_id = " + projectId;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate(strUpd);
        } catch (SQLException ex) {
            System.out.println("changeProject error="+ex);
        } catch (ClassNotFoundException ex) {
            System.out.println("changeProject error="+ex);
        }
    }
    
    public void changeProjectImage(ProjectM pc) {
        String strUpd = "UPDATE projects SET ";
        strUpd += "image ='" + pc.image + "' WHERE project_id = " + pc.projectId;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate(strUpd);
        } catch (SQLException ex) {
            System.out.println("changeProject error="+ex);
        } catch (ClassNotFoundException ex) {
            System.out.println("changeProject error="+ex);
        }
    }
    
    public List<ProjectM> getListProject(long userId) {
        List<ProjectM> lp = new ArrayList();
        ResultSet res;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            res = statement.executeQuery(SQL.getProject + userId + ";");
            while (res.next()) {
                ProjectM pm = new ProjectM();
                pm.projectId = res.getLong("project_id");
                pm.nameProject = res.getString("project_name");
                pm.namePackage = res.getString("package");
                pm.nameAPP = res.getString("app_name");
                pm.comment = res.getString("project_comment");
                pm.logo = res.getString("logo");
                pm.dateCreate = res.getLong("date_create");
                pm.image = res.getString("image");
                pm.host = res.getString("host");
                pm.listUsers = "[{\"userId\":" + userId + ",\"color\":\"#ff1eac\",\"litera\":\"B\"}]";
                lp.add(pm);
            }
        } catch (SQLException ex) {
            System.out.println("getListProject error="+ex);
        } catch (ClassNotFoundException ex) {
            System.out.println("getListProject error="+ex);
        }
        return lp;
    }
    
    public ProjectM getProjectById(String id) {
        ProjectM pm = null;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            ResultSet res = statement.executeQuery(SQL.getProjectById + inQuotes(id) + ";");
            if (res.next()) {
                pm = new ProjectM();
                pm.projectId = res.getLong("project_id");
                pm.nameProject = res.getString("project_name");
                pm.namePackage = res.getString("package");
                pm.nameAPP = res.getString("app_name");
                pm.comment = res.getString("project_comment");
                pm.logo = res.getString("logo");
                pm.host = res.getString("host");
                pm.colors = res.getString("color");
                pm.strings = res.getString("strings");
                pm.appParam = res.getString("app_param");
                pm.dimens = res.getString("dimens");
                pm.style = res.getString("style");
                pm.screens = res.getString("screens");
                pm.drawable = res.getString("drawable");
                pm.resurseInd = res.getString("resurse_ind");
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("getProjectById error="+ex);
        }
        return pm;
    }
    
    public ProjectM getParam(String id) {
        ProjectM pm = null;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            ResultSet res = statement.executeQuery(SQL.getProjectById + inQuotes(id) + ";");
            if (res.next()) {
                pm = new ProjectM();
                pm.projectId = res.getLong("project_id");
                pm.nameProject = res.getString("project_name");
                pm.namePackage = res.getString("package");
                pm.nameAPP = res.getString("app_name");
                pm.comment = res.getString("project_comment");
                pm.logo = res.getString("logo");
                pm.colors = res.getString("color");
                pm.strings = res.getString("strings");
                pm.dimens = res.getString("dimens");
                pm.style = res.getString("style");
                pm.screens = res.getString("screens");
                pm.drawable = res.getString("drawable");
                pm.resurseInd = res.getString("resurse_ind");
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("getProjectById error="+ex);
        }
        return pm;
    }
    
    public void setLastProject(String idUser, String idProject) {
        String strUpd = "UPDATE users SET ";
        strUpd += "project_id = " + idProject + " WHERE user_id = " + idUser;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate(strUpd);
        } catch (SQLException ex) {
            System.out.println("setLastProject error="+ex);
        } catch (ClassNotFoundException ex) {
            System.out.println("setLastProject error="+ex);
        }
    }
}
