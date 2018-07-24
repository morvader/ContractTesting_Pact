class Film {
    constructor(id, Name, Description, Year) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.Year = Year;
    }

    static fromJson(data) {
        return new Film(data.id, data.Name, data.Description, data.Year);
    }

}

module.exports = Film;