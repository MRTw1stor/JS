alert('Здравствуйте мой господин')
const values = [
  { value: '1', label: 'Option red' },
  { value: '2', label: 'Option orange' },
  { value: '3', label: 'Option blue' },
  { value: '4', label: 'Option pink' },
  { value: '5', label: 'Option green' },
  { value: '6', label: 'Option yellow' },
  { value: '7', label: 'Option black' }
]

function createDropDownList(values, selectValue = values[0].value) {
  const select = document.createElement('select')
  document.body.append(select)
  for (let i = 0; i < values.length; i++) {
    const option = document.createElement('option')
    select.append(option)
    option.value = values[i].value
    option.label = values[i].label
    if (values[i].value === selectValue) {
      selectedIndex = i
    }
  }
  select.selectedIndex = selectedIndex
  return select
}
createDropDownList(values,'4')
