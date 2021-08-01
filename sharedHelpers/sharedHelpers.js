
module.exports = {
  oneOfEmpty: function(values) {
     const validateByValueType = {
       'object': () => {
         const objectValues = Object.values(values);

         for (var i = 0; i < objectValues.length; i++) {
           if (isEmpty(objectValues[i])) {
             return true
           }
         }

         return false
       },
       'array': () => {
         console.error(values)
         for (var i = 0; i < values.length; i++) {
           if (isEmpty(objectValues[i])) {
             return true
           }
         }

         return false
       }
     }

     const multipleValueValidation = validateByValueType[typeof values]

     // Validates a single value
     if (multipleValueValidation === undefined) {
       return this.isEmpty(values)
     }

     return multipleValueValidation()
  },

  isEmpty: (value) => {
    const validateByValueType = {
      'object': () => {
        if (Object.value(value).length === 0) {
          return true
        }

        return false
      },
      'string': () => {
        if (value === '') {
          return true
        }

        return false
      },
      'number': () => {
        if (value === 0) {
          return true
        }

        return false
      },
      'boolean': () => {
        return !value
      }
    }

    const result = validateByValueType[typeof value]

    if (result === undefined) {
      return true
    }

    return result()
  }
}
