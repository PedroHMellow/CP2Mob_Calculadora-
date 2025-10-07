import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState('');
  const [newNumber, setNewNumber] = useState(true);
  const [history, setHistory] = useState([]);
  
  // Estados para o formulário
  const [form1Value1, setForm1Value1] = useState('');
  const [form1Value2, setForm1Value2] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('soma');

  const handleNumberPress = (num) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperationPress = (op) => {
    setPreviousValue(display);
    setOperation(op);
    setNewNumber(true);
  };

  const handleEquals = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    if (operation === '/' && current === 0) {
      Alert.alert('⚠️ Erro', 'Divisão por zero não permitida!', [{ text: 'OK' }]);
      return;
    }

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return;
    }

    // Adicionar ao histórico
    const calculation = `${prev} ${getOperationDisplay()} ${current} = ${result}`;
    setHistory([calculation, ...history.slice(0, 9)]); // Mantém apenas os últimos 10 cálculos

    setDisplay(result.toString());
    setPreviousValue('');
    setOperation('');
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue('');
    setOperation('');
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setNewNumber(false);
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const clearHistory = () => {
    Alert.alert(
      '🗑️ Limpar Histórico',
      'Deseja realmente limpar todo o histórico de cálculos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', onPress: () => setHistory([]), style: 'destructive' }
      ]
    );
  };

  // Função para calcular formulário
  const calculateForm1 = () => {
    const val1 = parseFloat(form1Value1);
    const val2 = parseFloat(form1Value2);
    
    if (isNaN(val1) || isNaN(val2)) {
      Alert.alert('⚠️ Erro', 'Por favor, insira valores válidos nos dois campos!', [{ text: 'OK' }]);
      return;
    }

    let result = 0;
    let opSymbol = '';
    
    switch (selectedOperation) {
      case 'soma':
        result = val1 + val2;
        opSymbol = '+';
        break;
      case 'subtracao':
        result = val1 - val2;
        opSymbol = '-';
        break;
      case 'multiplicacao':
        result = val1 * val2;
        opSymbol = '×';
        break;
      case 'divisao':
        if (val2 === 0) {
          Alert.alert('⚠️ Erro', 'Divisão por zero não permitida!', [{ text: 'OK' }]);
          return;
        }
        result = val1 / val2;
        opSymbol = '÷';
        break;
    }

    // Adicionar ao histórico
    const calculation = `${val1} ${opSymbol} ${val2} = ${result.toFixed(2)}`;
    setHistory([calculation, ...history.slice(0, 9)]);

    Alert.alert(
      '✅ Resultado',
      `${val1} ${opSymbol} ${val2} = ${result.toFixed(2)}`,
      [{ text: 'OK' }]
    );
  };

  const getOperationDisplay = (op) => {
    const currentOp = op || operation;
    switch (currentOp) {
      case '+': return '+';
      case '-': return '−';
      case '*': return '×';
      case '/': return '÷';
      default: return '';
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1827/1827951.png' }}
              style={styles.logo}
            />
            <Text style={styles.title}>CALCULADORA PRO</Text>
            <Text style={styles.subtitle}>Versão 2.0 - Completa</Text>
          </View>
        </View>

        {/* Calculadora Principal */}
        <View style={styles.calculatorContainer}>
          <View style={styles.displayContainer}>
            <Text style={styles.displaySecondary}>
              {previousValue && operation ? `${previousValue} ${getOperationDisplay()}` : ' '}
            </Text>
            <Text style={styles.display}>{display}</Text>
          </View>

          <View style={styles.buttonGrid}>
            {/* Primeira linha */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.buttonFunction} onPress={handleClear} activeOpacity={0.7}>
                <Text style={styles.buttonTextFunction}>AC</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonFunction} onPress={handleBackspace} activeOpacity={0.7}>
                <Text style={styles.buttonTextFunction}>⌫</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonFunction} onPress={() => setDisplay((parseFloat(display) / 100).toString())} activeOpacity={0.7}>
                <Text style={styles.buttonTextFunction}>%</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOperation} onPress={() => handleOperationPress('/')} activeOpacity={0.7}>
                <Text style={styles.buttonTextOperation}>÷</Text>
              </TouchableOpacity>
            </View>

            {/* Segunda linha */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('7')} activeOpacity={0.7}>
                <Text style={styles.buttonTextNumber}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('8')} activeOpacity={0.7}>
                <Text style={styles.buttonTextNumber}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('9')} activeOpacity={0.7}>
                <Text style={styles.buttonTextNumber}>9</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOperation} onPress={() => handleOperationPress('*')} activeOpacity={0.7}>
                <Text style={styles.buttonTextOperation}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Terceira linha */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('4')} activeOpacity={0.7}>
                <Text style={styles.buttonTextNumber}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('5')} activeOpacity={0.7}>
                <Text style={styles.buttonTextNumber}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('6')} activeOpacity={0.7}>
                <Text style={styles.buttonTextNumber}>6</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOperation} onPress={() => handleOperationPress('-')} activeOpacity={0.7}>
                <Text style={styles.buttonTextOperation}>−</Text>
              </TouchableOpacity>
            </View>

            {/* Quarta linha */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('1')} activeOpacity={0.7}>
                <Text style={styles.buttonTextNumber}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('2')} activeOpacity={0.7}>
                <Text style={styles.buttonTextNumber}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('3')} activeOpacity={0.7}>
                <Text style={styles.buttonTextNumber}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOperation} onPress={() => handleOperationPress('+')} activeOpacity={0.7}>
                <Text style={styles.buttonTextOperation}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Quinta linha */}
            <View style={styles.row}>
              <TouchableOpacity style={[styles.buttonNumber, styles.buttonWide]} onPress={() => handleNumberPress('0')} activeOpacity={0.7}>
                <Text style={styles.buttonTextNumber}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNumber} onPress={handleDecimal} activeOpacity={0.7}>
                <Text style={styles.buttonTextNumber}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonEquals} onPress={handleEquals} activeOpacity={0.7}>
                <Text style={styles.buttonTextEquals}>=</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Histórico de Cálculos */}
        {history.length > 0 && (
          <View style={styles.historyContainer}>
            <View style={styles.historyHeader}>
              <View style={styles.historyTitleContainer}>
                <Text style={styles.historyIcon}>📜</Text>
                <Text style={styles.historyTitle}>Histórico de Cálculos</Text>
              </View>
              <TouchableOpacity 
                style={styles.clearHistoryButton} 
                onPress={clearHistory}
                activeOpacity={0.7}
              >
                <Text style={styles.clearHistoryText}>🗑️ Limpar</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.historyList}>
              {history.map((item, index) => (
                <View key={index} style={styles.historyItemContainer}>
                  <Text style={styles.historyItemNumber}>{index + 1}.</Text>
                  <Text style={styles.historyItem}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Formulário 1 */}
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formIcon}>📊</Text>
            <Text style={styles.formTitle}>Formulário Avançado</Text>
            <Text style={styles.formSubtitle}>Cálculo com Operação Selecionável</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Primeiro Valor</Text>
            <TextInput
              style={styles.input}
              value={form1Value1}
              onChangeText={setForm1Value1}
              keyboardType="numeric"
              placeholder="Digite o primeiro número"
              placeholderTextColor="#555"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Segundo Valor</Text>
            <TextInput
              style={styles.input}
              value={form1Value2}
              onChangeText={setForm1Value2}
              keyboardType="numeric"
              placeholder="Digite o segundo número"
              placeholderTextColor="#555"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Operação</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedOperation}
                onValueChange={(itemValue) => setSelectedOperation(itemValue)}
                style={styles.picker}
                dropdownIconColor="#FF0000"
              >
                <Picker.Item label="➕ Adição" value="soma" />
                <Picker.Item label="➖ Subtração" value="subtracao" />
                <Picker.Item label="✖️ Multiplicação" value="multiplicacao" />
                <Picker.Item label="➗ Divisão" value="divisao" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.calculateButton} onPress={calculateForm1} activeOpacity={0.8}>
            <Text style={styles.calculateButtonText}>CALCULAR</Text>
          </TouchableOpacity>
        </View>

        {/* Formulário 2 - Entrada Direta */}
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formIcon}>🔢</Text>
            <Text style={styles.formTitle}>Formulário Rápido</Text>
            <Text style={styles.formSubtitle}>Entrada Direta de Expressão</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Digite uma Expressão</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 5 + 3 ou 10 * 2"
              placeholderTextColor="#555"
              onSubmitEditing={(e) => {
                try {
                  const expr = e.nativeEvent.text;
                  // Validação de segurança
                  if (/^[0-9+\-*/(). ]+$/.test(expr)) {
                    const result = eval(expr);
                    const calculation = `${expr} = ${result}`;
                    setHistory([calculation, ...history.slice(0, 9)]);
                    Alert.alert('✅ Resultado', calculation, [{ text: 'OK' }]);
                  } else {
                    Alert.alert('⚠️ Erro', 'Expressão contém caracteres inválidos!', [{ text: 'OK' }]);
                  }
                } catch (error) {
                  Alert.alert('⚠️ Erro', 'Expressão inválida!', [{ text: 'OK' }]);
                }
              }}
            />
            <Text style={styles.helperText}>Pressione Enter para calcular</Text>
          </View>

          <View style={styles.buttonNativeContainer}>
            <Button
              title="📖 INSTRUÇÕES"
              color="#FF0000"
              onPress={() => Alert.alert(
                '📖 Como usar',
                'Digite uma expressão matemática (ex: 5 + 3 * 2) e pressione Enter no teclado para calcular.\n\nOperadores: + - * /',
                [{ text: 'Entendi' }]
              )}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          <Text style={styles.footerTextMain}>Criado por PedroHMello - RM554223</Text>
          <Text style={styles.footerTextSmall}>🚀 Tecnologia & Inovação</Text>
          <Text style={styles.footerTextSmall}>Checkpoint 2 - React Native</Text>
          
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    backgroundColor: '#000',
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomWidth: 3,
    borderBottomColor: '#FF0000',
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 12,
    tintColor: '#FF0000',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FF0000',
    letterSpacing: 2,
    textShadowColor: '#FF0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    letterSpacing: 1,
  },
  calculatorContainer: {
    margin: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  displayContainer: {
    backgroundColor: '#0a0a0a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF0000',
    minHeight: 120,
  },
  displaySecondary: {
    color: '#666',
    fontSize: 20,
    textAlign: 'right',
    marginBottom: 8,
    height: 25,
    fontFamily: 'monospace',
  },
  display: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: 'monospace',
  },
  buttonGrid: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonNumber: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    paddingVertical: 24,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  buttonWide: {
    flex: 2,
  },
  buttonTextNumber: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
  },
  buttonOperation: {
    flex: 1,
    backgroundColor: '#FF0000',
    paddingVertical: 24,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonTextOperation: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonFunction: {
    flex: 1,
    backgroundColor: '#3a3a3a',
    paddingVertical: 24,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4a4a4a',
  },
  buttonTextFunction: {
    color: '#FF0000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonEquals: {
    flex: 1,
    backgroundColor: '#CC0000',
    paddingVertical: 24,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#CC0000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonTextEquals: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  historyContainer: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  historyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIcon: {
    fontSize: 28,
    marginRight: 10,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
    letterSpacing: 1,
  },
  clearHistoryButton: {
    backgroundColor: '#3a3a3a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  clearHistoryText: {
    color: '#FF0000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  historyList: {
    gap: 10,
  },
  historyItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#0a0a0a',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FF0000',
  },
  historyItemNumber: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    minWidth: 25,
  },
  historyItem: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'monospace',
    flex: 1,
  },
  formContainer: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    padding: 24,
    borderWidth: 2,
    borderColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  formIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 4,
    letterSpacing: 1,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#888',
    letterSpacing: 0.5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#0a0a0a',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  helperText: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
  pickerContainer: {
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF0000',
    overflow: 'hidden',
  },
  picker: {
    color: '#FFFFFF',
    backgroundColor: '#0a0a0a',
    height: 55,
  },
  calculateButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  buttonNativeContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  footer: {
    padding: 40,
    paddingBottom: 50,
    alignItems: 'center',
    backgroundColor: '#000',
    marginTop: 20,
  },
  footerDivider: {
    width: '80%',
    height: 2,
    backgroundColor: '#FF0000',
    marginBottom: 20,
  },
  footerTextMain: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  footerTextSmall: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  footerTextTiny: {
    color: '#666',
    fontSize: 11,
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
