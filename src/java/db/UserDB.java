package db;

import entity.Profile;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;

public class UserDB extends BaseDB{

    public UserDB(HttpServletRequest request) {
        super(request);
    }
    
    public Profile getUser(String login) {
        Profile user = null;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            ResultSet res = statement.executeQuery(SQL.getLogin + inQuotes(login) + ";");
            if (res.next()) {
                user = new Profile();
                user.userId = res.getLong("user_id");
                user.projectId = res.getLong("project_id");
                user.screenId = res.getLong("screen_id");
                user.password = res.getString("password");
                user.userName = res.getString("user_name");
                user.login = res.getString("login");
                user.resurseInd = res.getString("resurse_ind");
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("getUser error="+ex);
        }
        return user;
    }
    
    public long createUserId(Profile user) {
        long res = -1;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            String str = "INSERT INTO users (login, user_name, password, resurse_ind, project_id, screen_id) VALUES ('"
                    + user.login + "','" + user.userName + "','" + user.password + "','" + user.resurseInd + "',-1,-1);";
            int updateCount = statement.executeUpdate(str, Statement.RETURN_GENERATED_KEYS);
            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
              if (generatedKeys.next()) {
                res = generatedKeys.getLong("user_id");
              }
              else {
                  System.out.println("createUserId Creating failed, no ID obtained.");
              }
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("createUserId error="+ex);
        }
        return res;
    }
    
    public int setToken(String token, long userId, String resurseInd) {
        int size = -1;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            long dat = new Date().getTime();
            String str = "INSERT INTO token_user (token, user_id, user_resurse_ind, date_create) VALUES ('"+ token + "'," + userId + ",'" + resurseInd + "'," +dat + ");";
            size = statement.executeUpdate(str);
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("setToken error="+ex);
        }
        return size;
    }
    
    public int removeOldTokens() {
        int size = -1;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            long dat = new Date().getTime() - (60 * 60 * 24 * 1000);
            String str = "DELETE FROM token_user WHERE date_create < " + dat + ";";
            size = statement.executeUpdate(str);
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("removeOldTokens error="+ex);
        }
        return size;
    }
    
    public long updateProfile(String st) {
        long res = -1;
        try (Connection connectUpd = getDBConnection(); Statement statemUpdt = connectUpd.createStatement()) {
            res = statemUpdt.executeUpdate(st);
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("UserDB updateProfile error=" + ex);
        }
        return res;
    }
    
}
