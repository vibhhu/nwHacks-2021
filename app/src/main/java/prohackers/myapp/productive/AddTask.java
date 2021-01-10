package prohackers.myapp.productive;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;

public class AddTask extends AppCompatActivity {

    private Button add_subtask_button;
    private ListView subtask_list;
    private ArrayList<String> stringArrayList;
    private EditText subtask;
    private ArrayAdapter<String> stringArrayAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_task);

        add_subtask_button = (Button) findViewById(R.id.addSubTaskButton);
        subtask_list = (ListView) findViewById(R.id.subTaskView);
        subtask = (EditText) findViewById(R.id.addSubTaskDesc);

        stringArrayList = new ArrayList<String>();
//        for(int i=0;i<2;i++){
//            stringArrayList.add("Row"+ i);
//        }

        stringArrayAdapter = new ArrayAdapter<String>(getApplicationContext(), android.R.layout.simple_list_item_1, stringArrayList);
        subtask_list.setAdapter(stringArrayAdapter);
        add_subtask_button.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                stringArrayList.add(subtask.getText().toString());
                stringArrayAdapter.notifyDataSetChanged();
            }
        });





//        String yourTextValue = "Task Name";
//        TextView myTextView = (TextView) findViewById(R.id.taskName);
//        myTextView.setText(yourTextValue);
    }
}


//public class CustomAdapter extends RecyclerView.Adapter<CustomAdapter.ViewHolder> {
//
//    private String[] localDataSet;
//
//    /**
//     * Provide a reference to the type of views that you are using
//     * (custom ViewHolder).
//     */
//    public static class ViewHolder extends RecyclerView.ViewHolder {
//        private final TextView textView;
//
//        public ViewHolder(View view) {
//            super(view);
//            // Define click listener for the ViewHolder's View
//
//            textView = (TextView) view.findViewById(R.id.textView);
//        }
//
//        public TextView getTextView() {
//            return textView;
//        }
//    }
//
//    /**
//     * Initialize the dataset of the Adapter.
//     *
//     * @param dataSet String[] containing the data to populate views to be used
//     * by RecyclerView.
//     */
//    public CustomAdapter(String[] dataSet) {
//        localDataSet = dataSet;
//    }
//
//    // Create new views (invoked by the layout manager)
//    @Override
//    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
//        // Create a new view, which defines the UI of the list item
//        View view = LayoutInflater.from(viewGroup.getContext())
//                .inflate(R.layout.text_row_item, viewGroup, false);
//
//        return new ViewHolder(view);
//    }
//
//    // Replace the contents of a view (invoked by the layout manager)
//    @Override
//    public void onBindViewHolder(ViewHolder viewHolder, final int position) {
//
//        // Get element from your dataset at this position and replace the
//        // contents of the view with that element
//        viewHolder.getTextView().setText(localDataSet[position]);
//    }
//
//    // Return the size of your dataset (invoked by the layout manager)
//    @Override
//    public int getItemCount() {
//        return localDataSet.length;
//    }
//}
