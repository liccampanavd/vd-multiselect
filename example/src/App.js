import React, { useEffect, useState } from 'react'

import { MultiSelect } from '@liccampanavd/vd-multiselect'
import '@liccampanavd/vd-multiselect/dist/index.css'

const BoolOption = ({ text, checked, onChange }) => {
  return (
    <React.Fragment>
      <label>
        <input
          type='checkbox'
          defaultChecked={checked}
          onClick={(e) => onChange(e.target.checked)}
        />
        {text}
      </label>
    </React.Fragment>
  )
}

const App = () => {
  const [lines, setLines] = useState([])
  const [store, setStore] = useState([])
  const [loadingStore, setLoadingStore] = useState(true)

  const [props, setProps] = useState({
    title: 'Favourite Programming Languages',
    clearEnabled: true,
    disabled: false,
    displayInfo: true,
    searchEnabled: true,
    selectAllEnabled: true,
    selectionMode: 'multiple'
  })

  useEffect(() => {
    fetch('data.json')
      .then((res) => res.json())
      .then((res) =>
        setTimeout(() => {
          setStore(res)
          setLoadingStore(false)
        }, 4000)
      )
  }, [])

  const handleChange = (values) => {
    setLines(values)
  }

  return (
    <React.Fragment>
      <MultiSelect
        clearEnabled={props.clearEnabled}
        disabled={props.disabled}
        displayInfo={props.displayInfo}
        searchEnabled={props.searchEnabled}
        selectAllEnabled={props.selectAllEnabled}
        title={props.title}
        selectionMode={props.selectionMode}
        loading={props.loading || loadingStore}
        height='250px'
        store={store}
        labelKey='lineDesc'
        valueKey='lineId'
        value={lines}
        onValueChanged={(values) => handleChange(values)}
      />
      <br />
      <div className='settingBox'>
        <label>
          <b>Settings</b>
        </label>
        <a
          href={__dirname.concat('data.json')}
          target='_blank'
          rel='noopener noreferrer'
        >
          Link to data
        </a>
        <input
          type='text'
          placeholder='Title'
          value={props.title}
          maxLength={50}
          onChange={(e) =>
            setProps(Object.assign({}, props, { title: e.target.value }))
          }
        />
        <select
          defaultValue='multiple'
          onChange={(e) => {
            setProps(
              Object.assign({}, props, { selectionMode: e.target.value })
            )
            setLines([])
          }}
        >
          <option value='single'>Single</option>
          <option value='multiple'>Multiple</option>
        </select>
        {[
          'clearEnabled',
          'disabled',
          'displayInfo',
          'loading',
          'searchEnabled',
          'selectAllEnabled'
        ].map((key) => (
          <BoolOption
            key={key}
            text={key}
            checked={props[key]}
            onChange={(value) =>
              setProps(Object.assign({}, props, { [key]: value }))
            }
          />
        ))}
      </div>
    </React.Fragment>
  )
}

export default App
