package servlets;

import com.google.gson.JsonSyntaxException;
import db.ClientsDB;
import db.ProjectDB;
import entity.DataServlet;
import entity.DescrHost;
import interfaces.ErrorListener;
import interfaces.ResponseListener;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "WorkingWithDB", urlPatterns = {"/db/*"})
public class WorkingWithDB extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
        ClientsDB clientsDB = new ClientsDB(request);
        ProjectDB projectDb = new ProjectDB(request);
        String idPr = request.getHeader("projectId");
        switch (ds.query) {
            case "/db/create":
                try {
                    String stDescr = getStringRequest(request);
                    DescrHost dh = gson.fromJson(stDescr, DescrHost.class);
                } catch (IOException e) {
                    System.out.println(e);
                    sendError(response, "Host create error " + e.toString());
                }
                break;
        }
    }
    
    ResponseListener responseListener = new ResponseListener() {
        @Override
        public void onResponse(String response) {

        }
            
    };
    
    ErrorListener errorListener = new ErrorListener() {
        @Override
        public void onError(int code, String message) {

        }
            
    };

    @Override
    public int needToLogin() {
        return 2;
    }
}
