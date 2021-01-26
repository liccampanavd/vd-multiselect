import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

export const MultiSelect = ({
  disabled,
  disabledItems,
  displayInfo,
  elementAttr,
  clearEnabled,
  searchEnabled,
  selectAllEnabled,
  selectionMode,
  height,
  labelKey,
  loading,
  onValueChanged,
  onClear,
  onSelectAll,
  texts,
  store,
  title,
  value,
  valueKey,
  width
}) => {
  texts = Object.assign({}, MultiSelect.defaultProps.texts, texts)

  //#region References

  const refMain = useRef(null)

  //#endregion

  //#region States

  const [searchValue, setSearchValue] = useState('')
  const [storeFilter, setStoreFilter] = useState([])
  const [lastSelected, setLastSelected] = useState(null)

  //#endregion

  //#region Hooks

  useEffect(() => {
    if (refMain) {
      if (height) refMain.current.style.height = height
      if (width) refMain.current.style.width = width
    }
  }, [])

  //#endregion

  //#region Funtions & Events

  const createStyles = () => {
    let names = [styles.multiselect]
    if (disabled) names.push(styles.disabled)
    return names.join(' ')
  }

  const handlerSearch = (e) => {
    let filterContent = store.filter((v) => {
      if (
        v[labelKey].toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
      )
        return v
      return null
    })

    setStoreFilter(filterContent)
    setSearchValue(e.target.value)
  }

  const handleClear = () => {
    if (onClear) onClear()
    else onValueChanged([])
  }

  const handleSelectAll = () => {
    if (onSelectAll) onSelectAll()
    else {
      if (!disabled) {
        if (searchValue !== '') {
          if (storeFilter.length > 0) {
            if (value === null) {
              onValueChanged([
                ...storeFilter
                  .map((v) => v[valueKey])
                  .filter((j) => !disabledItems.includes(j))
              ])
            } else {
              if (diference(storeFilter, value, valueKey, disabledItems)) {
                //Select All (search)
                onValueChanged([
                  ...new Set([
                    ...value,
                    ...value
                      .filter((x) =>
                        storeFilter.map((y) => y[valueKey]).includes(x)
                      )
                      .concat(
                        storeFilter
                          .map((v) => v[valueKey])
                          .filter((x) => !value.includes(x))
                      )
                      .filter((x) => !disabledItems.includes(x))
                  ])
                ])
              } else {
                //Deselect All (search)
                onValueChanged([
                  ...value
                    .filter(
                      (x) => !storeFilter.map((y) => y[valueKey]).includes(x)
                    )
                    .filter((x) => !disabledItems.includes(x))
                ])
              }
            }
          }
        } else {
          if (store.length > 0)
            if (value === null) {
              onValueChanged([
                ...store
                  .map((v) => v[valueKey])
                  .filter((x) => !disabledItems.includes(x))
              ])
            } else {
              if (diference(store, value, valueKey, disabledItems)) {
                //Select All
                onValueChanged([
                  ...store
                    .map((v) => v[valueKey])
                    .filter((x) => !disabledItems.includes(x))
                ])
              } else {
                //Deselect All
                onValueChanged([])
              }
            }
        }
      }
    }
  }

  const handlerClick = (e, selectedValue) => {
    e.preventDefault()

    setLastSelected(selectedValue)

    if (e.shiftKey) {
      if (selectionMode !== 'multiple') {
        e.preventDefault()
        return
      }

      let startPos = store.map((item) => item[valueKey]).indexOf(lastSelected)
      let endPos = store.map((item) => item[valueKey]).indexOf(selectedValue)
      let currentValue = value || []
      let start = false
      let range = []
      let ds

      if (searchValue !== '') ds = storeFilter
      else ds = store

      ds.forEach((v) => {
        if (v[valueKey] === (startPos > endPos ? selectedValue : lastSelected))
          start = true

        if (start) {
          range.push(v[valueKey])
          if (
            v[valueKey] === (startPos > endPos ? lastSelected : selectedValue)
          )
            start = false
        }
      })

      onValueChanged(Array.from(new Set([...currentValue, ...range])))
    } else {
      let currentValue = value || []
      if (onValueChanged) {
        if (selectionMode !== 'multiple') {
          const index = currentValue.findIndex((v) => v === selectedValue)
          if (index === -1) onValueChanged([selectedValue])
          else onValueChanged([])
        } else {
          const index = currentValue.findIndex((v) => v === selectedValue)
          if (index < 0) onValueChanged([...currentValue, selectedValue])
          else {
            let current = currentValue.slice()
            current.splice(index, 1)
            onValueChanged(current)
          }
        }
      }
    }
  }

  const diference = (storeFilter, value, valueKey, disabledItems) =>
    storeFilter.length !==
    storeFilter.filter((v) => {
      return value.indexOf(v[valueKey]) !== -1
    }).length +
      (disabledItems !== undefined
        ? storeFilter.filter((v) => {
            return disabledItems.indexOf(v[valueKey]) !== -1
          }).length
        : 0)

  //#endregion

  return (
    <div ref={refMain} className={createStyles()} {...elementAttr}>
      <div className={styles.header}>
        <span>{title}</span>
        {displayInfo &&
          (value.length > 0 && selectionMode !== 'single' ? (
            <span>
              {value.length} of {store.length} {texts.selectedItems}
            </span>
          ) : searchValue !== '' ? (
            <span>
              {storeFilter.length} {texts.items}
            </span>
          ) : (
            <span>
              {store.length} {texts.items}
            </span>
          ))}
      </div>
      {((searchEnabled && selectionMode === 'single') ||
        ((searchEnabled || clearEnabled || selectAllEnabled) &&
          selectionMode === 'multiple')) && (
        <div className={styles.actionContainer}>
          {searchEnabled && (
            <input
              placeholder={texts.search}
              onChange={handlerSearch}
              value={searchValue}
            />
          )}
          {clearEnabled && value.length > 0 && selectionMode === 'multiple' && (
            <button className={styles.clearButton} onClick={handleClear}>
              {texts.clear}
            </button>
          )}
          {selectAllEnabled && selectionMode === 'multiple' && (
            <button
              className={styles.selectAllButton}
              onClick={handleSelectAll}
            >
              {searchValue !== ''
                ? diference(
                    storeFilter,
                    value,
                    valueKey,
                    disabledItems,
                    store
                  ) || storeFilter.length === 0
                  ? texts.selectAll
                  : texts.deselectAll
                : diference(store, value, valueKey, disabledItems) ||
                  store.length === 0
                ? texts.selectAll
                : texts.deselectAll}
            </button>
          )}
        </div>
      )}
      <div className={styles.selectionContainer}>
        {loading ? (
          <div className={styles.loader} />
        ) : searchValue !== '' && storeFilter.length === 0 ? (
          <div>{texts.noDataFound}</div>
        ) : (
          <ul>
            {(searchValue !== '' ? storeFilter : store).map((item) => (
              <li
                key={Math.random().toString(36).slice(2).substring(0, 8)}
                className={
                  disabledItems.includes(item[valueKey])
                    ? styles.disabled
                    : value.includes(item[valueKey])
                    ? styles.selected
                    : ''
                }
                onClick={(event) =>
                  disabledItems.includes(item[valueKey])
                    ? undefined
                    : handlerClick(event, item[valueKey])
                }
              >
                {item[labelKey]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

//#region Properties

MultiSelect.defaultProps = {
  clearEnabled: true,
  disabled: false,
  disabledItems: [],
  displayInfo: true,
  elementAttr: {},
  height: '',
  labelKey: '',
  loading: false,
  onValueChanged: undefined,
  onClear: undefined,
  onSelectAll: undefined,
  searchEnabled: true,
  selectAllEnabled: true,
  selectionMode: 'multiple',
  store: [],
  texts: {
    search: 'Search...',
    clear: 'Clear',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    items: 'Item(s)',
    selectedItems: 'Item(s) selected',
    noDataFound: 'No data to display'
  },
  title: '',
  value: [],
  valueKey: '',
  width: ''
}

MultiSelect.propTypes = {
  clearEnabled: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledItems: PropTypes.array,
  displayInfo: PropTypes.bool,
  elementAttr: PropTypes.object,
  height: PropTypes.string,
  labelKey: PropTypes.string,
  loading: PropTypes.bool,
  onValueChanged: PropTypes.func,
  onClear: PropTypes.func,
  onSelectAll: PropTypes.func,
  searchEnabled: PropTypes.bool,
  selectAllEnabled: PropTypes.bool,
  selectionMode: PropTypes.oneOf(['single', 'multiple']),
  store: PropTypes.array,
  texts: PropTypes.object,
  title: PropTypes.string,
  value: PropTypes.array,
  valueKey: PropTypes.string,
  width: PropTypes.string
}

//#endregion
