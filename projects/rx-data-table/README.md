# RxDataTable

This is a reactive data-table library powered by RxJS and NgBootstrap.

These are the features you'll get using this library:

* **Pagination:** RxDataTable pagination works through PaginationStrategies, you can indicate to each RxDataTable's component what strategy you want to use.

* **Grouping:** You could choose between a data-table with grouping or a basic data-table.

* **Reactive:** Each data-table component receives a BehaviorSubject, whenever you want to update the view with some changes, you should emit a new value to the data-table component.

* **Descriptors:** Instead of create an indepent cell template for each cell in your data-table, RxDataTable uses a set of descriptors (an array of properties as strings) which will be used to render the rows and cells of the data-table.

## Take a look

You can download this project to see how it works, you will be able to find the documentation in the root route, there I'll show
you how to use this library.

Just run the next commands:

```bash
$ git clone https://github.com/abnerey/rx-data-table.git
$ cd rx-data-table
$ npm install
$ ng serve 
```

Then open [localhost:4200](http://localhost:4200) in your browser.

Notes:
  In future releases I'll remove the coupling to NgBootstrap, let me know what you think, send me a message to: skylan0.2@gmail.com
