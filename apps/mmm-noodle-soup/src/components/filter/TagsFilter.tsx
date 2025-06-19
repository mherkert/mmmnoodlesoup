import { useStaticQuery, graphql, Link, navigate } from "gatsby";
import React from "react";
import { Button } from "../buttons/Button";
import { useLocation } from "@reach/router";
import { Tags } from "../tags/Tags";
import { useCombobox, useMultipleSelection } from "downshift";
import { Tag } from "../../data/types";
import classNames from "classnames";
import {
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Work in progress: 
 * @param param0
 * @returns 
 */
export const TagsFilter = ({ currentTags }: { currentTags: string[] }) => {
  const { allTags } = useStaticQuery(graphql`
    query {
      allTags: allSanityTag {
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  const initialSelectedItems: Tag[] = allTags.nodes?.filter((tag: Tag) =>
    currentTags.includes(tag.name)
  );

  const MultipleComboBox = () => {
    const [inputValue, setInputValue] = React.useState("");
    const [selectedItems, setSelectedItems] =
      React.useState(initialSelectedItems);
    const items = React.useMemo(
      () =>
        allTags.nodes?.filter(
          (tag: Tag) =>
            !selectedItems
              .map((selectedTag) => selectedTag.name)
              .includes(tag.name)
        ),
      [selectedItems, inputValue]
    );
    const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
      useMultipleSelection<Tag>({
        selectedItems,
        onStateChange({ selectedItems: newSelectedItems, type }) {
          switch (type) {
            case useMultipleSelection.stateChangeTypes
              .SelectedItemKeyDownBackspace:
            case useMultipleSelection.stateChangeTypes
              .SelectedItemKeyDownDelete:
            case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
            case useMultipleSelection.stateChangeTypes
              .FunctionRemoveSelectedItem: {
              setSelectedItems(newSelectedItems || []);
              const newSearchParams = new URLSearchParams(location.search);
              newSearchParams.delete("tag");
              newSelectedItems?.forEach((tag) =>
                newSearchParams.append("tag", tag.name)
              );
              const newSearch = newSearchParams.toString();
              navigate(
                `${location.pathname}${newSearch ? `?${newSearch}` : ""}`
              );
              break;
            }
            default:
              break;
          }
        },
      });
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useCombobox({
      items,
      itemToString(item: Tag | null) {
        return item ? item.name : "";
      },
      defaultHighlightedIndex: 0, // after selection, highlight the first item.
      selectedItem: null,
      inputValue,
      stateReducer(state, actionAndChanges) {
        const { changes, type } = actionAndChanges;

        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            return {
              ...changes,
              isOpen: true, // keep the menu open after selection.
              highlightedIndex: 0, // with the first option highlighted.
            };
          default:
            return changes;
        }
      },
      onStateChange({
        inputValue: newInputValue,
        type,
        selectedItem: newSelectedItem,
      }) {
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
          case useCombobox.stateChangeTypes.InputBlur:
            if (newSelectedItem) {
              setSelectedItems([...selectedItems, newSelectedItem]);
              setInputValue("");
              const newSearchParams = new URLSearchParams(location.search);
              newSearchParams.append("tag", newSelectedItem.name);
              const newSearch = newSearchParams.toString();
              navigate(
                `${location.pathname}${newSearch ? `?${newSearch}` : ""}`
              );
            }
            break;

          case useCombobox.stateChangeTypes.InputChange:
            setInputValue(newInputValue || "");

            break;
          default:
            break;
        }
      },
    });

    return (
      <div className="w-96">
        <div className="flex flex-row gap-2 items-center">
          {/* <div className="flex flex-row gap-2 items-center lg:w-[var(--search-input-width-lg)] md:w-[var(--search-input-width-md)] w-[var(--search-input-width-sm)]"> */}
          <label className="sr-only" {...getLabelProps()}>
            Pick a tag or two:
          </label>
          <div className="shadow-sm bg-white inline-flex gap-2 items-center flex-wrap">
            {selectedItems.map(
              function renderSelectedItem(selectedItemForRender, index) {
                return (
                  <span
                    className="bg-gray-100 rounded-md px-1"
                    key={`selected-item-${index}`}
                    {...getSelectedItemProps({
                      selectedItem: selectedItemForRender,
                      index,
                    })}
                  >
                    {selectedItemForRender.name}
                    <span
                      className="px-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelectedItem(selectedItemForRender);
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </span>
                  </span>
                );
              }
            )}
            {/* <div className="flex gap-0.5 grow"> */}
            <div
              className="bg-white flex shadow-sm  gap-0.5 rounded-md focus-within:ring-2 focus-within:ring-white 
              focus-within:ring-offset-2 focus-within:ring-offset-primary"
            >
              <input
                placeholder="Filter by tag"
                className="rounded-md py-2 px-2 text-sm/6 focus:outline-none"
                //   className="lg:w-[var(--search-input-width-lg)] md:w-[var(--search-input-width-md)] w-[var(--search-input-width-sm)] rounded-md
                //  py-2 px-2 text-sm/6 focus:outline-none"
                {...getInputProps(
                  getDropdownProps({ preventKeyAction: isOpen })
                )}
              />
              <Button variant="ghost" size="sm" {...getToggleButtonProps()}>
                {isOpen ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </Button>
            </div>
          </div>
        </div>
        <ul
          className={`absolute rounded-md bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
            !(isOpen && items.length) && "hidden"
          }`}
          // className={`absolute w-inherit bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
          //   !(isOpen && items.length) && "hidden"
          // }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item: Tag, index: number) => (
              <li
                className={classNames(
                  highlightedIndex === index && "bg-blue-300",
                  selectedItem === item && "font-bold",
                  "py-2 px-3 shadow-sm flex flex-col"
                )}
                key={`${item.slug.current}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item.name}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  };

  return <MultipleComboBox />;
};
