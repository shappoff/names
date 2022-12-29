import {default as React} from 'react';

const {
    applicationID, adminAPIKey
} = env;

const algoliasearch = require("algoliasearch");

const client = algoliasearch(applicationID, adminAPIKey);

const currentAlgoliaIndex = client.initIndex('names');

const App = () => {
    const [value, setValue] = React.useState<string>('');
    const [hits, setHits] = React.useState<Array<any>>([]);
    React.useEffect(() => {
        currentAlgoliaIndex.search(value, {})
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