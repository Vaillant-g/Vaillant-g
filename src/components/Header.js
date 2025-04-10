import React from "react";

const Header = ({ activeTab, onTabChange, toggleFlex, isMapDisplayFlex }) => {
  return (
    <header className="header" style={styles.header}>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li
            style={{
              ...styles.navItem,
              backgroundColor: activeTab === "guessr_helpr" ? "#ADD8E6" : "#87CEEB", // Couleur différente pour chaque onglet
              fontWeight: activeTab === "guessr_helpr" ? "bold" : "normal",
            }}
            onClick={() => onTabChange("guessr_helpr")}
          >
            guessr_helpr
          </li>
          <li
            style={{
              ...styles.navItem,
              backgroundColor: activeTab === "discover" ? "#FFB6C1" : "#FF69B4", // Couleur différente pour chaque onglet
              fontWeight: activeTab === "discover" ? "bold" : "normal",
            }}
            onClick={() => onTabChange("discover")}
          >
            Discover
            {activeTab === "discover" && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Empêche le clic de changer l'onglet
                  toggleFlex();
                }}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                {isMapDisplayFlex ? "Flex" : "Bloc"}
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    width: "100%",
    padding: 0,
    backgroundColor: "#f8f8f8", // Couleur de fond générale du header
  },
  nav: {
    width: "100%", // Navigation prend 100% de la largeur
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    padding: 0,
    margin: 0,
    width: "100%", // La liste prend 100% de la largeur du parent
  },
  navItem: {
    flex: 1, // Chaque onglet prend 50% de la largeur
    padding: "30px",
    textAlign: "center",
    cursor: "pointer",
    color: "#fff", // Couleur du texte (blanc)
    transition: "background-color 0.3s ease", // Transition pour l'effet de survol
  },
};

export default Header;
