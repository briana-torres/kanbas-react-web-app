export default function BootstrapTables() {
    return <div>
        <div id="wd-css-styling-tables">
            <h2>Tables</h2>
            <table className="table">
                <thead>
                    <tr className="table-dark"><th>Quiz</th><th>Topic</th><th>Date</th><th>Grade</th></tr>
                </thead>
                <tbody>
                    <tr className="table-warning"><td>Q1</td><td>HTML</td><td>2/3/21</td><td>85</td></tr>
                    <tr className="table-danger"><td>Q2</td><td>CSS</td><td>2/10/21</td><td>90</td></tr>
                    <tr className="table-primary"><td>Q3</td><td>JavaScript</td><td>2/17/21</td><td>90</td></tr>
                </tbody>
                <tfoot>
                    <tr className="table-success"><td colSpan={3}>Average</td><td>90</td></tr>
                </tfoot>
            </table>
        </div>
        <div id="wd-css-responsive-tables">
            <h2>Responsive tables</h2>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr><th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
                            <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
                            <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
                            <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
                            <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="wd-css-styling-lists">
            <h2>Favorite movies</h2>
            <ul className="list-group">
                <li className="list-group-item active">Aliens</li>
                <li className="list-group-item">Terminator</li>
                <li className="list-group-item">Blade Runner</li>
                <li className="list-group-item">Lord of the Ring</li>
                <li className="list-group-item disabled">Star Wars</li>
            </ul>
        </div>
        <div id="wd-css-hyperlink-list">
            <h3>Favorite books</h3>
            <div className="list-group">
                <a href="https://en.wikipedia.org/wiki/Dune_(novel)"
                    className="list-group-item list-group-item-action active">
                    Dune</a>
                <a href="https://en.wikipedia.org/wiki/The_Lord_of_the_Rings"
                    className="list-group-item list-group-item-action">
                    Lord of the Rings</a>
                <a href="https://en.wikipedia.org/wiki/The_Forever_War"
                    className="list-group-item list-group-item-action">
                    The Forever War</a>
                <a href="https://en.wikipedia.org/wiki/2001:_A_Space_Odyssey_(novel)"
                    className="list-group-item list-group-item-action">
                    2001 A Space Odyssey</a>
                <a href="https://en.wikipedia.org/wiki/Ender%27s_Game"
                    className="list-group-item list-group-item-action disabled">
                    Ender's Game</a>
            </div>
        </div>
    </div>
}