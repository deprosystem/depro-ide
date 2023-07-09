package servlets;

import db.UserDB;
import entity.DataServlet;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "Users", urlPatterns = {"/users/*"})
public class Users extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
        String data = "";
        UserDB userDB = new UserDB(request);
        String sql;
        String res;
        
        switch (ds.query) {
            case "/users/list":
                sql = "SELECT user_id, login, user_name, resurse_ind, code_confirm, tyme_actual FROM users ORDER BY user_name";
                res = userDB.getQueryList(sql);
                
                if (res.indexOf("error") == 0) {
                    sendError(response, res);
                } else {
                    sendResult(response, res);
                }
                break;
            case "/users/listProjects":
                String idUser = request.getParameter("id");
                sql = "SELECT project_id, project_name, date_create FROM projects WHERE user_id = " + idUser;
                res = userDB.getQueryList(sql);
                if (res.indexOf("error") == 0) {
                    sendError(response, res);
                } else {
                    sendResult(response, res);
                }
                break;
        }
    }

    @Override
    public int needToLogin() {
        return 0;
    }
}
