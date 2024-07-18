import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@/constants/api";
import axios from "axios";

const KEY_CODES = {
  DOWN: 40,
  UP: 38,
  PAGE_DOWN: 34,
  ESCAPE: 27,
  PAGE_UP: 33,
  ENTER: 13,
};

type TSuggestions = {
  stores: {
    name: string;
    username: string;
    logo: string;
  }[];
  keywords: { name: string }[];
};
export function useAutoComplete({ delay = 500, source: any }) {
  const [myTimeout, setMyTimeOut] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const keywordsListRef = useRef<HTMLUListElement>(null);
  const storesListRef = useRef<HTMLUListElement>(null);
  const [suggestions, setSuggestions] = useState<TSuggestions>({
    stores: [],
    keywords: [],
  });
  const [isBusy, setBusy] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexId, setSelectedIndexId] = useState("");
  const [textValue, setTextValue] = useState("");
  const [isProductLoading, setProductLoading] = useState(false);
  const [isProductError, setProductError] = useState(false);
  const [productsByKeyword, setProductByKeyword] = useState([]);

  const navigate = useNavigate();

  async function getProductByKeyword(keyword: string) {
    const url = `${API_URL}/api/v1/stores/search-products-by-keyword?search=${keyword}&page=1&perPage=20`;
    setProductLoading(true);
    try {
      const response = await axios.get(url);
      setProductByKeyword(response.data.data);
      setProductLoading(false);
    } catch (error) {
      setProductError(true);
      setProductLoading(false);
    }
  }
  function delayInvoke(callback: () => void) {
    if (myTimeout) {
      clearTimeout(myTimeout);
    }
    setMyTimeOut(setTimeout(callback, delay));
  }

  function selectOption(index: number, id: string) {
    if (index > -1) {
      console.log(index, id);
      if (id.startsWith("store")) {
        setTextValue(suggestions.stores[index].name);
        navigate(`/${suggestions.stores[index].username}`);
      }
      if (id.startsWith("keyword")) {
        setTextValue(suggestions.keywords[index].name);
        getProductByKeyword(suggestions.keywords[index].name);
      }
    }
  }

  async function getSuggestions(searchTerm: string) {
    if (searchTerm && source) {
      setBusy(true);
      const { stores, keywords } = await source(searchTerm);
      setSuggestions({ stores, keywords });
      setBusy(false);
    }
  }

  function clearSuggestions() {
    delayInvoke(() => {
      setSuggestions({ stores: [], keywords: [] });
      setSelectedIndex(-1);
    });
  }

  function onTextChange(searchTerm: string) {
    setTextValue(searchTerm);

    if (searchTerm.trim()) {
      setBusy(true);
      clearSuggestions();
      delayInvoke(() => {
        getSuggestions(searchTerm);
        setBusy(false);
      });
    } else {
      clearSuggestions();
      setBusy(false);
    }
  }

  // research what this code does
  const optionHeight =
    keywordsListRef?.current?.children[0]?.clientHeight +
    storesListRef.current?.children[0]?.clientHeight;

  function scrollUp() {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
    if (!keywordsListRef.current) return;
    keywordsListRef.current.scrollTop -= optionHeight;

    if (!storesListRef.current) return;
    storesListRef.current.scrollTop -= optionHeight;
  }

  function scrollDown() {
    if (
      selectedIndex <
      suggestions.stores.length + suggestions.keywords.length - 1
    ) {
      setSelectedIndex(selectedIndex + 1);
    }
    if (!keywordsListRef.current) return;
    keywordsListRef.current.scrollTop = selectedIndex * optionHeight;
    if (!storesListRef.current) return;
    storesListRef.current.scrollTop = selectedIndex * optionHeight;
  }

  // function pageDown() {
  //   setSelectedIndex(
  //     suggestions.stores.length + suggestions.keywords.length - 1
  //   );

  //   if (!listRef.current) return;
  //   listRef.current.scrollTop =
  //     (suggestions.stores.length + suggestions.keywords.length - 1) *
  //     optionHeight;
  // }

  // function pageUp() {
  //   setSelectedIndex(0);
  //   if (!listRef.current) return;
  //   listRef.current.scrollTop = 0;
  // }

  function onKeyDown(e) {
    const keyOperation = {
      [KEY_CODES.DOWN]: scrollDown,
      [KEY_CODES.UP]: scrollUp,
      [KEY_CODES.ENTER]: () => {
        if (suggestions.keywords.length || suggestions.stores.length) {
          selectOption(selectedIndex, selectedIndexId);
        }
        if (textValue.trim()) {
          getProductByKeyword(textValue);
        }
      },
      [KEY_CODES.ESCAPE]: clearSuggestions,
      // [KEY_CODES.PAGE_DOWN]: pageDown,
      // [KEY_CODES.PAGE_UP]: pageUp,
    };
    if (keyOperation[e.keyCode]) {
      keyOperation[e.keyCode]();
    } else {
      setSelectedIndex(-1);
    }
  }

  return {
    bindOptionKey: {
      onClick: (e) => {
        const nodes = Array.from(keywordsListRef?.current.children);
        selectOption(nodes.indexOf(e.target.closest("li")), e.target.id);
        setSelectedIndexId(e.target.id);
      },
    },
    bindOptionStore: {
      onClick: (e) => {
        const nodes = Array.from(storesListRef?.current.children);
        selectOption(nodes.indexOf(e.target.closest("li")), e.target.id);
        setSelectedIndexId(e.target.id);
      },
    },
    bindInput: {
      value: textValue,
      onChange: (e) => onTextChange(e.target.value),
      onKeyDown,
    },
    bindOptionsKey: {
      ref: keywordsListRef,
    },
    bindOptionsStores: {
      ref: storesListRef,
    },
    isBusy,
    suggestions,
    setSuggestions,
    selectedIndex,
    textValue,
    isProductLoading,
    isProductError,
    productsByKeyword,
  };
}
