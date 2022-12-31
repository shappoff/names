import {default as React} from 'react';
import {names} from "./namse";

const App = () => {
    const [value, setValue] = React.useState<string>('');
    const [hits, setHits] = React.useState<Array<any>>([]);
    React.useEffect(() => {
        if (value.length) {
            setHits(names.filter(({name}: any) => {
                const regexp = new RegExp(value, "g");
                return name.match(regexp);
            }));
        } else {
            setHits([]);
        }
    }, [value]);
    const searchHandler = ({target}: any) => {
        setValue(target.value);
    }

    return <div>
        <input autoFocus onChange={searchHandler} type="text" value={value} id="input"/>
        <ul className="list-group">
            {
                hits.map(({name, sex}, index) => <li key={index} className="list-group-item" dangerouslySetInnerHTML={{__html: `${name}, ${sex === 'male' ? 'муж' : 'жен'}`}}></li>)
            }
        </ul>
    </div>
};

export default App;