const img = document.getElementById('img')
const pos = document.getElementById('pos')
const border = document.createElement('div')
border.id = 'border'

const fileInput = document.getElementById('file')
function updateFile () {
  const [file] = fileInput.files
  if (file) {
    img.src = URL.createObjectURL(file)
  }
}

fileInput.onchange = updateFile
pos.onchange = updateBorder

updateFile()
updateBorder()

function calcOffset (dom) {
  const result = [ dom.offsetLeft, dom.offsetTop ]

  if (dom.parentNode) {
    const p = calcOffset(dom.parentNode)
    if (p[0] !== undefined) {
      result[0] += p[0]
      result[1] += p[1]
    }
  }

  return result
}

function get_pos (e) {
  const offset = calcOffset(img)

  const x = e.clientX - offset[0]
  const y = e.clientY - offset[1]

  const px = (100 * x / img.offsetWidth).toFixed(2)
  const py = (100 * y / img.offsetHeight).toFixed(2)

  return [px, py]
}

img.ondragstart = (e) => {
  return false
}

img.onmousedown = (e) => {
  const p = get_pos(e)
  pos.value = p[0] + ',' + p[1] + ','
}

img.onmouseup = (e) => {
  const p = get_pos(e)
  pos.value += p[0] + ',' + p[1]

  navigator.clipboard.writeText(pos.value)

  updateBorder()

  return false
}

function updateBorder () {
  const current_pos = pos.value.split(/,/g)

  img.parentNode.appendChild(border)
  border.style.left = current_pos[0] + '%'
  border.style.top = current_pos[1] + '%'
  border.style.width = (current_pos[2] - current_pos[0]) + '%'
  border.style.height = (current_pos[3] - current_pos[1]) + '%'
}
