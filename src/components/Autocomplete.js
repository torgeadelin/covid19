import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import theme from "../theme";
import countries from "../data/countries.json";

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : countries.filter(
        (c) => c.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = (suggestion) => suggestion.name;
const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selected: null,
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
    
  };

   onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.callback(suggestion)
   }


  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Select a country",
      value,
      onChange: this.onChange,
      style: {
        padding: "20px 30px",
        width: 300,
        fontSize: "1rem",
        color: theme.colors.black,
        boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.1)",
        borderRadius: 10,
        fontWeight: 500,
        border: 0,
      },
    };

    return (
          
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
  
    );
  }
}
