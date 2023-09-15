import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { FiSearch } from "react-icons/fi"
import icon1 from "../../assets/icons8-estacionamento-64.png";
function SelectComponent({ onSelectionChange }) {
  const [selectedItems, setSelectedItems] = useState([]);
  
  const options = [
   
  /*   {
      label: <img  src="https://img.icons8.com/cotton/64/parking--v4.png" alt="parking--v4"/>,
      value: "praia",
      text:'Praia uillas'
     
    }, */
    { label: "⛰️ Montanha", value: "montanha" },
    { label: "⛰️ Montanha", value: "montanha" },
    { label: "🏙️ Cidade", value: "cidade" },
   
  ];

  const handleChange = (selectedOptions) => {
    setSelectedItems(selectedOptions);

    // Filtrar apenas os valores selecionados
   const selectedValues = selectedOptions.map((option) => ({
  label: option.label,
  value: option.value,
}));


    // Chame onSelectionChange para passar os valores selecionados para o componente pai
    onSelectionChange(selectedValues);
  };

  const label = "Selecione Destaques Completo"; // Nome completo

  const customStyles = {
    multiSelectContainer: {
      // Estilos para o contêiner do MultiSelect
      width: "100%",
      border: "1px solid #ccc",
      borderRadius: "18px",
      padding: "8px 0",
    },
    searchBox: {
      // Estilos para a caixa de pesquisa (se houver)
      width: "100%",
      border: "none",
      borderBottom: "1px solid #ccc",
      borderRadius: "0",
      padding: "8px",
    },
    option: {
      // Estilos para cada opção da lista
      padding: "8px",
      cursor: "pointer",
    },
    selectedValues: {
      // Estilos para a área de valores selecionados
      padding: "8px",
    },
    optionContainer: {
      // Estilos para o contêiner da lista de opções
    }
  };

  return (
    <div>
      <h1>{label}</h1>
      <MultiSelect
        options={options}
        value={selectedItems}
        onChange={handleChange}
        labelledBy={label}
        overrideStrings={{
          selectSomeItems: "Selecione alguns itens",
        }}
        styles={customStyles}
      />
    </div>
  );
}

export default SelectComponent;
