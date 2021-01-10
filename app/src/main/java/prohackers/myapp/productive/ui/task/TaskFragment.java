package prohackers.myapp.productive.ui.task;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import prohackers.myapp.productive.AddTask;
import prohackers.myapp.productive.MenuActivity;
import prohackers.myapp.productive.R;

public class TaskFragment extends Fragment {

    private TaskViewModel dashboardViewModel;

    FloatingActionButton taskfab;
    ListView tasklist;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        dashboardViewModel =
                new ViewModelProvider(this).get(TaskViewModel.class);
        View root = inflater.inflate(R.layout.fragment_task, container, false);
        final TextView textView = root.findViewById(R.id.addTaskText);

        String[] menuItems = {"Do", "Doo", "Doo!"};

        taskfab = root.findViewById(R.id.addTaskFAB);

        //waits for task list fab to be pressed before navigating to the next screen
        taskfab.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        //go to different screen that doesn't exist yet
                        startActivity(new Intent(getActivity(), AddTask.class));
                    }
                });

//        tasklist = (ListView) root.findViewById(R.id.taskListView);
//        ArrayAdapter<String> taskListViewAdapter = new ArrayAdapter<String>(getActivity(),android.R.layout.simple_list_item_1, menuItems);
//        tasklist.setAdapter(taskListViewAdapter);


        dashboardViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(@Nullable String s) {
                textView.setText(s);
            }
        });
        return root;
    }
}