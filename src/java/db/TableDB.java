package db;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import tables.Table;

public class TableDB extends BaseDB {

    public TableDB(HttpServletRequest request) {
        super(request);
    }
    
    public long createTable(Table table) {
        long res = -1;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            String str = "INSERT INTO tables_descr (id_project, name_tab, descr, fields) VALUES ("
                    + table.id_project + ",'" + table.name_tab + "','" + table.descr + "','" + table.fields + "');";
            int updateCount = statement.executeUpdate(str, Statement.RETURN_GENERATED_KEYS);
            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
              if (generatedKeys.next()) {
                res = generatedKeys.getLong("id_table");
              }
              else {
                  System.out.println("createTableId Creating failed, no ID obtained.");
              }
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("createTable error="+ex);
        }
        return res;
    }
    
    public List<Table> getListTables(String projectId) {
        List<Table> lp = new ArrayList();
        ResultSet res;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            res = statement.executeQuery(SQL.getListTab + projectId + ";");
            while (res.next()) {
                Table pm = new Table();
                pm.id_table = 
                pm.id_table = res.getLong("id_table");
                pm.id_project = res.getLong("id_project");
                pm.name_tab = res.getString("name_tab");
                pm.descr = res.getString("descr");
                pm.fields = res.getString("fields");
System.out.println("getListTables pm.fields="+pm.fields+"<<");
                lp.add(pm);
            }
        } catch (SQLException ex) {
            System.out.println("getListProject error="+ex);
        } catch (ClassNotFoundException ex) {
            System.out.println("getListProject error="+ex);
        }
        return lp;
    }
}
