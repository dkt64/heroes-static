package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/mattn/go-sqlite3"
)

// Hero - Moja struktura
// ========================================================
type Hero struct {
	ID   int    `gorm:"AUTO_INCREMENT" form:"ID" 		json:"ID"`
	Name string `gorm:"not null" form:"Name" 				json:"Name"`
	Desc string `gorm:"not null" form:"Desc" 				json:"Desc"`
}

// ErrCheck - obsługa błedów
// ========================================================
func ErrCheck(errNr error) {
	if errNr != nil {
		fmt.Println(errNr)
	}
}

// OpenDb - otworzenie bazy
// ========================================================
func OpenDb() *gorm.DB {

	db, err := gorm.Open("sqlite3", "./data.db")
	ErrCheck(err)

	// Jeżeli jeszcze nie utworzona to utworzyć
	if !db.HasTable(&Hero{}) {
		db.CreateTable(&Hero{})
		db.Set("gorm:table_options", "ENGINE=InnoDB").CreateTable(&Hero{})
	}

	return db
}

// ListAll - Wylistowanie wszystkich z tablicy
// ========================================================
func ListAll(c *gin.Context) {

	db := OpenDb()
	defer db.Close()

	var heroes []Hero
	db.Find(&heroes)

	c.JSON(http.StatusOK, heroes)
}

// ListOne - Wylistowanie jednego z tablicy
// ========================================================
func ListOne(c *gin.Context) {
	db := OpenDb()
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

	db := OpenDb()
	defer db.Close()

	var newHero Hero
	err := c.BindJSON(&newHero)
	ErrCheck(err)

	db.Create(&newHero)
	c.JSON(http.StatusOK, gin.H{"Status": "AddNew OK"})
}

// Update - Aktualizacja jednego hero
// ========================================================
func Update(c *gin.Context) {

	db := OpenDb()
	defer db.Close()

	nr, err := strconv.Atoi(c.Param("id"))
	ErrCheck(err)

	var hero Hero
	db.First(&hero, nr)

	var newHero Hero
	err = c.BindJSON(&newHero)
	ErrCheck(err)

	result := Hero{
		ID:   hero.ID,
		Name: newHero.Name,
		Desc: newHero.Desc,
	}

	db.Save(&result)

	c.JSON(http.StatusOK, gin.H{"Status": "Update OK"})
}

// DeleteOne - Usunięcie jednego hero
// ========================================================
func DeleteOne(c *gin.Context) {

	db := OpenDb()
	defer db.Close()

	nr, err := strconv.Atoi(c.Param("id"))
	ErrCheck(err)

	var hero Hero
	db.First(&hero, nr)

	db.Delete(&hero)

	c.JSON(http.StatusOK, gin.H{"Status": "DeleteOne OK"})
}

// MAIN()
// ========================================================
func main() {

	r := gin.Default()

	r.GET("/api/v1/heroes", ListAll)
	r.GET("/api/v1/heroes/:id", ListOne)
	r.POST("/api/v1/heroes", AddNew)
	r.PUT("/api/v1/heroes/:id", Update)
	r.DELETE("/api/v1/heroes/:id", DeleteOne)

	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
