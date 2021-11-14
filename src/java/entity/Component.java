package entity;

import java.util.List;
import projects.Model;
import projects.Navigator;
import projects.Options;
import projects.Param;
import projects.View;

public class Component {
    public String type;
    public int componId;
    public Model model;
    public View view;
    public Param param;
    public Navigator navigator;
    public List<ItemVisibility> visiManager;
    public Options options;
}
