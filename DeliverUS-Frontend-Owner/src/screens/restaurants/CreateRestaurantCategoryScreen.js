import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import { createCategory, getRestaurantCategories } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import { Formik } from 'formik'
import TextError from '../../components/TextError'

export default function CreateRestaurantScreen ({ navigation }) {
  const [backendErrors, setBackendErrors] = useState()
  const [restaurantCategories, setRestaurantCategories] = useState([])
  const [varColor, setVarColor] = useState('green')
  const [varFontSize, setVarFontSize] = useState(15)

  const initialRestaurantCategoryValues = { name: null }
  const tips = ['¡Crear una nueva categoría de comida implica un nuevo universo de sabores!',
    '¿No sabes cómo nombrar a tu nueva categoría de comida? ¡Pide ayuda a la IA!',
    'Sólo el creador sabe el secreto del sabor',
    '¡Buenos días! Espero que te vaya todo bien en tu restaurante.',
    "Mi categoría favorita es la 'Spanish Food', ¿sabes por qué?: ¡porque España tiene la mejor dieta del mundo!"]

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(50, 'Name too long')
      .required('Name is required')
      .notOneOf(restaurantCategories, 'Category already exists')
      // .test('unique', 'Category already exists', n => { return !restaurantCategories.some(category => category === n) })
  })

  useEffect(() => {
    async function fetchRestaurantCategories () {
      try {
        const fetchedRestaurantCategories = await getRestaurantCategories()
        const fetchedRestaurantCategoriesReshaped = fetchedRestaurantCategories.map((e) => e.name)
        setRestaurantCategories(fetchedRestaurantCategoriesReshaped)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving restaurant categories. ${error} `,
          type: 'error',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }
    fetchRestaurantCategories()
  }, [])

  const createRestaurantCategory = async (values) => {
    setBackendErrors([])
    try {
      const createdRestaurantCategory = await createCategory(values)
      showMessage({
        message: `Restaurant category ${createdRestaurantCategory.name} succesfully created.`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.navigate('CreateRestaurantScreen', { dirty: true })
    } catch (error) {
      showMessage({
        message: `Restaurant category ${values.name} could not be created. ${error.message}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      console.log(error)
      setBackendErrors(error.errors)
    }
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialRestaurantCategoryValues}
      onSubmit={createRestaurantCategory}>
      {({ handleSubmit }) => (
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: '60%' }}>
            <InputItem
              name='name'
              label='Name:'
            />

            {backendErrors &&
              backendErrors.map((error, index) => <TextError key={index}>{error.param}-{error.msg}</TextError>)
            }

            <TextRegular textStyle={{ fontStyle: 'italic', alignSelf: 'center', marginTop: 10, fontSize: varFontSize }}>{tips[Math.floor(Math.random() * 5)]}</TextRegular>

            <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', height: 200, marginBottom: 10 }}>
              <View style={{ flex: 1, flexDirection: 'column', marginRight: 5 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Pressable
                  onPress={() => { setVarColor('red') }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? GlobalStyles.brandPrimary
                        : GlobalStyles.brandGreen
                    },
                    styles.buttonColor
                  ]}>
                  <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                    <TextRegular textStyle={styles.text}>Red</TextRegular>
                  </View>
                  </Pressable>
                  <Pressable
                  onPress={() => { setVarColor('green') }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? GlobalStyles.brandPrimary
                        : GlobalStyles.brandGreen
                    },
                    styles.buttonColor
                  ]}>
                  <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                    <TextRegular textStyle={styles.text}>Green</TextRegular>
                  </View>
                  </Pressable>
                  <Pressable
                  onPress={() => { setVarColor('pink') }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? GlobalStyles.brandPrimary
                        : GlobalStyles.brandGreen
                    },
                    styles.buttonColor
                  ]}>
                  <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                    <TextRegular textStyle={styles.text}>Pink</TextRegular>
                  </View>
                  </Pressable>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Pressable
                    onPress={() => { setVarFontSize(15) }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? GlobalStyles.brandPrimary
                          : GlobalStyles.brandGreen
                      },
                      styles.buttonFont
                    ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>15</TextRegular>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => { setVarFontSize(20) }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? GlobalStyles.brandPrimary
                          : GlobalStyles.brandGreen
                      },
                      styles.buttonFont
                    ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>20</TextRegular>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'column', marginLeft: 5 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable
                    onPress={() => { setVarColor('orange') }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? GlobalStyles.brandPrimary
                          : GlobalStyles.brandGreen
                      },
                      styles.buttonColor
                    ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>Orange</TextRegular>
                    </View>
                    </Pressable>
                    <Pressable
                    onPress={() => { setVarColor('blue') }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? GlobalStyles.brandPrimary
                          : GlobalStyles.brandGreen
                      },
                      styles.buttonColor
                    ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>Blue</TextRegular>
                    </View>
                    </Pressable>
                    <Pressable
                    onPress={() => { setVarColor('black') }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? GlobalStyles.brandPrimary
                          : GlobalStyles.brandGreen
                      },
                      styles.buttonColor
                    ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>Black</TextRegular>
                    </View>
                    </Pressable>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable
                      onPress={() => { setVarFontSize(25) }}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? GlobalStyles.brandPrimary
                            : GlobalStyles.brandGreen
                        },
                        styles.buttonFont
                      ]}>
                      <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                        <TextRegular textStyle={styles.text}>25</TextRegular>
                      </View>
                    </Pressable>
                    <Pressable
                      onPress={() => { setVarFontSize(30) }}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? GlobalStyles.brandPrimary
                            : GlobalStyles.brandGreen
                        },
                        styles.buttonFont
                      ]}>
                      <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                        <TextRegular textStyle={styles.text}>30</TextRegular>
                      </View>
                    </Pressable>
                  </View>
              </View>
            </View>

            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? varColor
                    : varColor
                },
                styles.button
              ]}>
            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
              <MaterialCommunityIcons name='content-save' color={'white'} size={20}/>
              <TextRegular textStyle={styles.text}>
                Save
              </TextRegular>
            </View>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  buttonColor: {
    borderRadius: 5,
    height: 30,
    padding: 2,
    width: '31.5%',
    marginTop: 20,
    marginBottom: 20
  },
  buttonFont: {
    borderRadius: 5,
    height: 30,
    padding: 2,
    width: '48.5%',
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    borderRadius: 5,
    height: 30,
    padding: 2,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  }
})
