package servlets;

import com.google.gson.JsonSyntaxException;
import db.ProjectDB;
import db.SQL;
import db.TableDB;
import entity.DataServlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import projects.ProjectM;
import tables.Table;

@WebServlet(name = "Tables", urlPatterns = {"/tables/*"})
public class Tables extends BaseServlet {

        @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
            TableDB tableDb = new TableDB(request);
            List<Table> listTables;
            Table tb;
            switch (ds.query) {
                case "/tables/descr":
                    tb = null;
                    try {
                        String stDescr = getStringRequest(request);
                        tb = gson.fromJson(stDescr, Table.class);
                    } catch (JsonSyntaxException | IOException e) {
                        System.out.println(e);
                        sendError(response, "Tables create error " + e.toString());
                    }
                    long id = -1;
                    if (tb != null) {
                        if (tb.id_table == -1) {
                            id = tableDb.createTable(tb);
                            tb.id_table = id;
                            sendResult(response, gson.toJson(tb));
                        } else {
                            
                            
                            
                            sendResult(response, gson.toJson(tb));
                        }
                    } else {
                        sendError(response, "Tables create error in initial data");
                    }
                    break;
                case "/tables/list":
                    String projectId = request.getHeader("projectId");
                    listTables = tableDb.getListTables(projectId);
                    sendResult(response, gson.toJson(listTables));
                    
                    
                    
//                    sendResult(response, tableDb.getQueryList(SQL.getListTab + projectId));
                    break;
            }
    }
    
    @Override
    public int needToLogin() {
        return 2;
    }
}
