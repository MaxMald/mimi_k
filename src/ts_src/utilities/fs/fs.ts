
class fs
{
    constructor()
    {}

    static loadFile(filePath)
    : string 
    {
        let result : string = null;
        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

        xmlhttp.open("GET", filePath, false);
        xmlhttp.send();
        if (xmlhttp.status==200) 
        {
          result = xmlhttp.responseText;
        }

        return result;
      }
}

export = fs;