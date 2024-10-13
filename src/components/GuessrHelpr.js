import React, { useState } from "react";
import coveredCountries from "../data/countries.json";
import CountryList from "./CountryList";

const GuessrHelp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries] = useState(coveredCountries.countries);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [customMetas, setCustomMetas] = useState([]);
  const [allMetas, setAllMetas] = useState([]);
  const [newMetaName, setNewMetaName] = useState("");
  const [newMetaValue, setNewMetaValue] = useState("");
  const [newMetaImage, setNewMetaImage] = useState(""); // Stocke l'URL ou le fichier image

  // Fonction pour gérer la sélection de pays
  const handleCountrySelect = (countryCode) => {
    const selectedCountry = filteredCountries.find(
      (c) => c.code === countryCode
    );
    setCurrentCountry(selectedCountry);
    const savedMetas = allMetas.filter(
      (meta) => meta.countryCode === countryCode
    );
    setCustomMetas(savedMetas);
  };

  // Fonction pour gérer l'ajout d'une nouvelle méta
  const addCustomMeta = () => {
    if (newMetaName && newMetaValue && currentCountry) {
      const newMeta = {
        countryCode: currentCountry.code,
        metaName: newMetaName,
        metaContent: newMetaValue,
        imageUrl: newMetaImage || "/images/custom.png", // URL de l'image ou image par défaut
      };

      // Ajouter la nouvelle méta à la liste des métas actuelles du pays
      setCustomMetas([...customMetas, newMeta]);

      // Ajouter la nouvelle méta à la liste des métas de tous les pays
      setAllMetas([...allMetas, newMeta]);

      // Réinitialiser les champs du formulaire
      setNewMetaName("");
      setNewMetaValue("");
      setNewMetaImage("");
    }
  };

  // Fonction pour gérer l'import d'image via un fichier
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMetaImage(reader.result); // Enregistrer l'image comme base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour gérer l'image collée dans l'input
  const handlePasteImage = (e) => {
    const items = e.clipboardData.items;
    for (let item of items) {
      if (item.type.indexOf("image") !== -1) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewMetaImage(reader.result); // Enregistrer l'image comme base64
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  const renderCountryMetaTable = () => {
    if (!currentCountry) return null;

    return (
      <table style={styles.metaTable}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Méta</th>
            <th style={styles.tableHeader}>Valeur</th>
            <th style={styles.tableHeader}>Image</th>
          </tr>
        </thead>
        <tbody>
          {customMetas.map((meta, index) => (
            <tr key={index}>
              <td>{meta.metaName}</td>
              <td>{meta.metaContent}</td>
              <td>
                <img
                  src={meta.imageUrl}
                  alt={meta.metaName}
                  style={styles.metaImage}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={styles.container}>
      <CountryList
        countries={filteredCountries}
        onCountrySelect={handleCountrySelect}
      />
      <div style={styles.content}>
        <h1>Guessr Help</h1>
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />
        {currentCountry && (
          <>
            <h1>
              {currentCountry.name} <span>{currentCountry.code}</span>
            </h1>

            {/* Formulaire pour ajouter une nouvelle méta */}
            <div style={styles.metaForm}>
              <input
                type="text"
                placeholder="Nom de la méta"
                value={newMetaName}
                onChange={(e) => setNewMetaName(e.target.value)}
                style={styles.metaInput}
              />
              <input
                type="text"
                placeholder="Valeur de la méta"
                value={newMetaValue}
                onChange={(e) => setNewMetaValue(e.target.value)}
                style={styles.metaInput}
              />

              {/* Input pour télécharger une image */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={styles.metaInput}
              />

              {/* Input pour coller une image */}
              <input
                type="text"
                placeholder="Collez l'image ici ou URL"
                value={newMetaImage}
                onPaste={handlePasteImage}
                onChange={(e) => setNewMetaImage(e.target.value)}
                style={styles.metaInput}
              />

              <button onClick={addCustomMeta} style={styles.metaButton}>
                Ajouter méta
              </button>
            </div>

            {/* Tableau des métas */}
            {renderCountryMetaTable()}

            {/* Bouton pour exporter les métas en JSON */}
            {/* <button onClick={exportMetasToJson} style={styles.metaButton}>
              Exporter les métas en JSON
            </button> */}
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  searchBar: {
    marginBottom: "20px",
    padding: "8px",
    width: "100%",
    boxSizing: "border-box",
  },
  metaTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  metaImage: {
    width: "50px", // Taille des images dans la colonne
    height: "auto",
  },
  metaForm: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  metaInput: {
    padding: "8px",
    flex: 1,
  },
  metaButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  tableHeader: {
    textAlign: "left", // Alignement à gauche des en-têtes
    padding: "10px",
  },
};

export default GuessrHelp;
