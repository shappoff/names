import {default as React} from 'react';
import {names} from "./namse";

const App = () => {
    const [value, setValue] = React.useState<string>('');
    const [currentSex, setCurrentSex] = React.useState<'male' | 'female'>('male');
    const [hits, setHits] = React.useState<Array<any>>([]);
    React.useEffect(() => {
        if (value.length) {
            setHits(names.filter(({name, sex}: any) => {
                const regexp = new RegExp(value, "g");
                return name.match(regexp) && currentSex === sex;
            }));
        } else {
            setHits([]);
        }
    }, [value, currentSex]);

    const searchHandler = ({target}: any) => setValue(target.value);

    const radioHandler = ({currentTarget}: any) => setCurrentSex(currentTarget.value);

    return <div>
        <div className="type-table">
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="type" id="male" value="male" defaultChecked onChange={radioHandler} />
                    <label className="form-check-label" htmlFor="male">Мужское</label></div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="type" id="female" value="female"  onChange={radioHandler} />
                    <label className="form-check-label" htmlFor="female">Женское</label></div>
        </div>
        <input autoFocus onChange={searchHandler} type="text" value={value} id="input"/>
        <ul className="list-group">
            {
                hits.map(({name, sex}, index) =>
                    <li key={index}
                        className="list-group-item"
                        dangerouslySetInnerHTML={{__html: `${name}, ${sex === 'male' ? 'муж' : 'жен'}`}}
                    ></li>
                )
            }
        </ul>
    </div>
};

export default App;