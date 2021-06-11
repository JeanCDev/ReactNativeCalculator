import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class App extends React.Component {
  state = {
    ...initialState
  }

  setDigit = digit => {
    const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay;

    if(digit === "." && !clearDisplay && this.state.displayValue.includes(".")) return;

    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + digit;

    this.setState({
      displayValue,
      clearDisplay: false
    });

    if(digit !== "."){
      const newValue = parseFloat(displayValue);

      const values = [...this.state.values];
      values[this.state.current] = newValue;

      this.setState({
        values
      });
    }
  }

  clearMemory = () => {
    this.setState({
      ...initialState
    });
  }

  setOperations = operation => {
    if (this.state.current === 0){
      this.setState({operation, current: 1, clearDisplay: true});
    } else {
      const equals = operation === "=";
      const values = [...this.state.values];

      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (err){
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      });
    }
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>

        <Display value={this.state.displayValue}/>

        <View style={styles.buttons}>
          <Button label="AC" triple onClick={this.clearMemory}/>
          <Button label="/" operation onClick={this.setOperations}/>
          <Button label="7" onClick={this.setDigit}/>
          <Button label="8" onClick={this.setDigit}/>
          <Button label="9" onClick={this.setDigit}/>
          <Button label="*" operation onClick={this.setOperations}/>
          <Button label="4" onClick={this.setDigit}/>
          <Button label="5" onClick={this.setDigit}/>
          <Button label="6" onClick={this.setDigit}/>
          <Button label="-" operation onClick={this.setOperations}/>
          <Button label="1" onClick={this.setDigit}/>
          <Button label="2" onClick={this.setDigit}/>
          <Button label="3" onClick={this.setDigit}/>
          <Button label="+" operation onClick={this.setOperations}/>
          <Button label="0" double onClick={this.setDigit}/>
          <Button label="." onClick={this.setDigit}/>
          <Button label="=" operation onClick={this.setOperations}/>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons:{
    flexDirection: "row",
    flexWrap: "wrap"
  }
});