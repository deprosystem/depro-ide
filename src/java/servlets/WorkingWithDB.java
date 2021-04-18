package servlets;

import com.google.gson.JsonSyntaxException;
import entity.DataServlet;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "WorkingWithDB", urlPatterns = {"/db/*"})
public class WorkingWithDB extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
        String projectId = request.getHeader("projectId");
        switch (ds.query) {
            case "/db/create":
                try {
                    String stDescr = getStringRequest(request);
System.out.print(stDescr+"<<");
//                    fffff = gson.fromJson(stDescr, FFFFF.class);
                } catch (JsonSyntaxException | IOException e) {
                    System.out.println(e);
                    sendError(response, "Host create error " + e.toString());
                }
                break;
        }
    }

    @Override
    public int needToLogin() {
        return 2;
    }
}
