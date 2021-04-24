package db;

import java.io.File;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.http.HttpServletRequest;

public class ClientsDB extends BaseDB {

    public ClientsDB(HttpServletRequest request) {
        super(request);
    }
    
    public void createSchema(String nameSchema) {
        try (Connection connection = getClientDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate("DROP SCHEMA IF EXISTS " + nameSchema + " CASCADE");
            statement.executeUpdate("CREATE SCHEMA " + nameSchema);
            statement.executeUpdate("CREATE TABLE " + nameSchema + "._tables_meta " 
                    + "(id_table INTEGER not NULL, name_table VARCHAR(50), title_table VARCHAR(100), fields_table TEXT, PRIMARY KEY ( id_table ))");
            statement.executeUpdate("CREATE UNIQUE INDEX IF NOT EXISTS name_t ON " + nameSchema + "._tables_meta " + "(name_table)");
            statement.executeUpdate("CREATE TABLE " + nameSchema + "._querys_meta " 
                    + "(id_query INTEGER not NULL, name_query VARCHAR(100), title_query VARCHAR(100), type_query INTEGER, fields_query TEXT, from_query TEXT, " 
                    + "where_query TEXT, order_query TEXT, PRIMARY KEY ( id_query ))"); 
            statement.executeUpdate("CREATE UNIQUE INDEX IF NOT EXISTS name_q ON " + nameSchema + "._querys_meta " + "(name_query)");
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("createSchema error="+ex.getMessage());
        }
    }
    
}
