import {default as React} from 'react';

const {
    applicationID, adminAPIKey, index_name
} = env;

const algoliasearch = require("algoliasearch");

const client = algoliasearch(applicationID, adminAPIKey);

const currentAlgoliaIndex = client.initIndex(index_name);

const App = () => {
    const [value, setValue] = React.useState<string>('');
    const [hits, setHits] = React.useState<Array<any>>([]);
    React.useEffect(() => {
        value.length && currentAlgoliaIndex.search(value, {})
            .then(({hits, facets}: any) => {
                setHits(hits);
            });
    }, [value]);
    const searchHandler = ({target}: any) => {
        setValue(target.value);
    }

    return <div>
        <input autoFocus onChange={searchHandler} type="text" value={value} id="input"/>
        <ul className="list-group">
            {
                hits.map(({name, sex, _highlightResult}, index) => <li key={index} className="list-group-item" dangerouslySetInnerHTML={{__html: `${_highlightResult.name.value}, ${sex === 'male' ? 'муж' : 'жен'}`}}></li>)
            }
        </ul>
    </div>
};

export default App;