namespace MHMLW_Common;

public class User
{
    public string id { get; private set; }
    public string name { get; private set; }
    public int level { get; private set; }
    public int province { get; private set; }
    public int helped { get; private set; }
    public int beingHelped { get; private set; }

    public User(string id, string name, int level, int province, int helped, int beingHelped)
    {
        this.id = id;
        this.name = name;
        this.level = level;
        this.province = province;
        this.helped = helped;
        this.beingHelped = beingHelped;
    }

    public void ModifyName(string newName) =>
        name = newName;

    public void LevelUp() =>
        level++;

    public void AddHelped() =>
        helped++;

    public void AddBeingHelped() =>
        beingHelped++;
}