import React from "react";

const Header = ({ activeTab, onTabChange }) => {
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
              backgroundColor: activeTab === "training" ? "#FFB6C1" : "#FF69B4", // Couleur différente pour chaque onglet
              fontWeight: activeTab === "training" ? "bold" : "normal",
            }}
            onClick={() => onTabChange("training")}
          >
            Training
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
