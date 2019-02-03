# search
An instant search api.

### Demo
https://search-instant.herokuapp.com/

### Implementation
This API uses a hash table, which is essentially the JavaScript object, as a store for possible search queries. The inspiration comes from fuzzy search, where partial string matching produces expected results.

Each match is paired with a score, which is calculated using two factors, 
1. Closeness of the match to the start of the string
2. Length of the possible match

The API is demonstrated with a simple frontend.
