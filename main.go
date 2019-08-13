package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/dkt64/baza"
	"github.com/gin-gonic/gin"
)

// Hero - Moja struktura
// ========================================================
type Hero struct {
	ID   int    `gorm:"AUTO_INCREMENT" form:"ID" 		json:"ID"`
	Name string `gorm:"not null" form:"Name" 			json:"Name"`
	Desc string `gorm:"not null" form:"Desc" 			json:"Desc"`
}

// ErrCheck - obsługa błedów
// ========================================================
func ErrCheck(errNr error) {
	if errNr != nil {
		fmt.Println(errNr)
	}
}

// ListAll - Wylistowanie wszystkich z tablicy
// ========================================================
func ListAll(c *gin.Context) {

	c.Header("Access-Control-Allow-Origin", "*")

	db := baza.Open(Hero{}, "./data.db")
	defer db.Close()

	var heroes []Hero
	db.Find(&heroes)

	c.JSON(http.StatusOK, heroes)
}

// ListOne - Wylistowanie jednego z tablicy
// ========================================================
func ListOne(c *gin.Context) {

	c.Header("Access-Control-Allow-Origin", "*")

	db := baza.Open(Hero{}, "./data.db")
	defer db.Close()

	nr, err := strconv.Atoi(c.Param("id"))
	ErrCheck(err)

	var hero Hero
	db.First(&hero, nr)

	c.JSON(http.StatusOK, hero)
}

// AddNew - Dodanie nowego hero
// ========================================================
func AddNew(c *gin.Context) {

	db := baza.Open(Hero{}, "./data.db")
	defer db.Close()

	var newHero Hero
	err := c.BindJSON(&newHero)
	ErrCheck(err)

	db.Create(&newHero)

	c.Header("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, gin.H{"Status": "AddNew OK"})
}

// Update - Aktualizacja jednego hero
// ========================================================
func Update(c *gin.Context) {

	c.Header("Access-Control-Allow-Origin", "*")

	db := baza.Open(Hero{}, "./data.db")
	defer db.Close()

	nr, err := strconv.Atoi(c.Param("id"))
	ErrCheck(err)

	var hero Hero
	db.First(&hero, nr)

	var newHero Hero
	err = c.BindJSON(&newHero)
	ErrCheck(err)

	result := Hero{
		ID:   newHero.ID,
		Name: newHero.Name,
		Desc: newHero.Desc,
	}

	db.Save(&result)

	c.JSON(http.StatusOK, gin.H{"Status": "Update OK"})
}

// DeleteOne - Usunięcie jednego hero
// ========================================================
func DeleteOne(c *gin.Context) {

	c.Header("Access-Control-Allow-Origin", "*")

	db := baza.Open(Hero{}, "./data.db")
	defer db.Close()

	nr, err := strconv.Atoi(c.Param("id"))
	ErrCheck(err)

	var hero Hero
	db.First(&hero, nr)

	db.Delete(&hero)

	c.JSON(http.StatusOK, gin.H{"Status": "DeleteOne OK"})
}

// Options - Obsługa request'u OPTIONS (CORS)
// ========================================================
func Options(c *gin.Context) {
	if c.Request.Method != "OPTIONS" {
		c.Next()
	} else {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
		c.Header("Access-Control-Allow-Headers", "authorization, origin, content-type, accept")
		c.Header("Allow", "HEAD,GET,POST,PUT,PATCH,DELETE,OPTIONS")
		c.Header("Content-Type", "application/json")
		c.AbortWithStatus(http.StatusOK)
	}
}

// MAIN()
// ========================================================
func main() {

	r := gin.Default()
	r.Use(Options)

	r.LoadHTMLGlob("./dist/*.html")
	r.StaticFS("/css", http.Dir("./dist/css"))
	r.StaticFS("/js", http.Dir("./dist/js"))
	r.StaticFS("/img", http.Dir("./dist/img"))
	r.StaticFile("/", "./dist/index.html")
	r.StaticFile("favicon.ico", "./dist/img/favicon.ico")

	api := r.Group("/api/v1")
	{
		api.GET("/heroes", ListAll)
		api.GET("/heroes/:id", ListOne)
		api.POST("/heroes", AddNew)
		api.PUT("/heroes/:id", Update)
		api.DELETE("/heroes/:id", DeleteOne)
	}

	// Listen and Server in 0.0.0.0:8080
	r.Run(":8090")
}
