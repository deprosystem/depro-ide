package servlets;

import db.SQL;
import db.UserDB;
import entity.DataServlet;
import entity.Profile;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "UsersAdmin", urlPatterns = {"/users_adm/*"})
public class UsersAdmin extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
        Profile userC = null;
        Profile user = null;
        String data = "";
        UserDB userDB = new UserDB(request);
        
        switch (ds.query) {
            case "/users_adm/list":
                    sendResult(response, userDB.getQueryList(SQL.getListUsers));
                break;
            case "/users_adm/projects":
                    String idUser = request.getParameter("userId");
                    sendResult(response, userDB.getQueryList(SQL.getListProjectInUsers + idUser));
                break;
        }
    }
}
