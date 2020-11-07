package android;

import java.util.List;

public class AndroidPar {
    public String id;
    public String viewId;
    public String type, orientataion;
    public int typeBlock;
    public int width, height;
    public Integer background;
    public Grav gravLayout;
    public Grav gravity;
    public Integer left, top;
    public String margin, leftMarg, topMarg, rightMarg, bottomMarg;
    public String padding, leftPad, topPad, rightPad, bottomPad;
    public String toLeftOf, toRightOf, below, above;
    public String text, src;
    public Integer textSize, textColor;
    public ComponParam componParam;
    public TabLayout tabLayout;
// Параметры для конкретных элементов
//    public Boolean formStringRes;
    public Boolean formResourse, visibility;
    public Integer scaleType;
    public String imgBack, imgHamburg;
    public List<AndroidPar> children;
}
